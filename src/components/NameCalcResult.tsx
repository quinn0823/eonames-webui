import type { MingziResponse } from '../types';

const NAME_LABELS: Record<string, string> = {
  fuxing: '父姓',
  muxing: '母姓',
  zi: '字',
  ming: '名',
  hao: '号'
};

const GRID_LABELS: Record<string, string> = {
  tiange: '天格',
  renge: '人格',
  dige: '地格',
  waige: '外格',
  qige: '奇格',
  zongge: '总格'
};

const SANCAI_LABELS: Record<string, string> = {
  tiange: '天格',
  renge: '人格',
  dige: '地格'
};

function luckColor(luck: string) {
  if (luck === '吉' || luck === '大吉') return 'text-green-600';
  if (luck === '凶' || luck === '大凶') return 'text-red-600';
  return '';
}

function xiyongColor(isXiyong: boolean) {
  return isXiyong ? 'text-green-600' : 'text-red-600';
}

interface Props {
  data: MingziResponse;
}

export default function NameCalcResult({ data }: Props) {
  const { name_parts: np, grids, sancai } = data;
  const hasHao = 'hao' in np;

  const nameKeys = ['fuxing', 'muxing', 'zi', 'ming'];
  const gridKeys = ['tiange', 'renge', 'dige', 'waige', 'zongge'];
  const sancaiKeys = ['tiange', 'renge', 'dige'];
  if (hasHao) {
    nameKeys.push('hao');
    gridKeys.splice(4, 0, 'qige');
  }

  const nc = nameKeys.length;
  const gc = gridKeys.length;
  const sc = sancaiKeys.length;

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-sm text-center">
        <thead>
          <tr className="border bg-gray-100">
            <th colSpan={nc} className="border px-3 py-1.5 font-medium">
              姓名部分
            </th>
            <th colSpan={gc} className="border px-3 py-1.5 font-medium">
              五格
            </th>
            <th colSpan={sc} className="border px-3 py-1.5 font-medium">
              三才
            </th>
          </tr>
          <tr className="border bg-gray-50">
            {nameKeys.map((k) => (
              <th key={k} className="border px-3 py-1 font-normal">
                {NAME_LABELS[k]}
              </th>
            ))}
            {gridKeys.map((k) => (
              <th key={k} className="border px-3 py-1 font-normal">
                {GRID_LABELS[k]}
              </th>
            ))}
            {sancaiKeys.map((k) => (
              <th key={k} className="border px-3 py-1 font-normal">
                {SANCAI_LABELS[k]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Row 1: strokes / shuli+luck / sancai luck */}
          <tr className="border">
            {nameKeys.map((k) => (
              <td key={k} className="border px-3 py-1">
                {np[k].strokes}
              </td>
            ))}
            {gridKeys.map((k) => {
              const g = grids[k];
              return (
                <td key={k} className="border px-3 py-1">
                  <div>{g.stroke_sum}</div>
                  <div className={luckColor(g.shuli.luck)}>{g.shuli.luck}</div>
                </td>
              );
            })}
            {sancaiKeys.map((k) => {
              const luck = sancai[k as 'tiange' | 'renge' | 'dige'];
              return (
                <td key={k} className={`border px-3 py-1 ${luckColor(luck)}`}>
                  {luck || '-'}
                </td>
              );
            })}
          </tr>
          {/* Row 2: wuxing per char / grid wuxing+yinyang / grid wuxing+yinyang */}
          <tr className="border">
            {nameKeys.map((k) => (
              <td key={k} className="border px-3 py-1">
                <div className="flex justify-center gap-0.5">
                  {np[k].characters.map((ch, i) => (
                    <span key={i} className={xiyongColor(ch.is_xiyong)}>
                      {ch.wuxing}
                    </span>
                  ))}
                </div>
              </td>
            ))}
            {gridKeys.map((k) => {
              const g = grids[k];
              return (
                <td key={k} className="border px-3 py-1">
                  <span className={xiyongColor(g.is_xiyong)}>{g.wuxing}</span>{' '}
                  <span className={xiyongColor(g.is_xiyong_yinyang)}>
                    {g.yinyang}
                  </span>
                </td>
              );
            })}
            {sancaiKeys.map((k) => {
              const g = grids[k];
              return (
                <td key={k} className="border px-3 py-1">
                  {g.wuxing} {g.yinyang}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
