import { useState, type FormEvent } from 'react';
import type { MingziParams } from '../types';

const WUXING = ['金', '木', '水', '火', '土'] as const;

interface Props {
  onSubmit: (params: MingziParams) => void;
  loading: boolean;
}

export default function NameCalcForm({ onSubmit, loading }: Props) {
  const [fuxing, setFuxing] = useState('');
  const [muxing, setMuxing] = useState('');
  const [zi, setZi] = useState('');
  const [ming, setMing] = useState('');
  const [hao, setHao] = useState('');
  const [xiyongWuxing, setXiyongWuxing] = useState<string[]>([]);
  const [xiyongYinyang, setXiyongYinyang] = useState('');

  const handleWuxingToggle = (w: string) => {
    setXiyongWuxing((prev) =>
      prev.includes(w) ? prev.filter((v) => v !== w) : [...prev, w]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params: MingziParams = { fuxing, muxing, zi, ming };
    if (hao) params.hao = hao;
    if (xiyongWuxing.length > 0) {
      params.xiyong_wuxing = xiyongWuxing;
      if (xiyongYinyang) params.xiyong_yinyang = xiyongYinyang;
    }
    onSubmit(params);
  };

  const disableSubmit =
    !fuxing || !muxing || !zi || !ming || loading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">父姓</span>
          <input
            type="text"
            value={fuxing}
            onChange={(e) => setFuxing(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">母姓</span>
          <input
            type="text"
            value={muxing}
            onChange={(e) => setMuxing(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">字</span>
          <input
            type="text"
            value={zi}
            onChange={(e) => setZi(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">名</span>
          <input
            type="text"
            value={ming}
            onChange={(e) => setMing(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">号（可选）</span>
          <input
            type="text"
            value={hao}
            onChange={(e) => setHao(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-medium mb-1">喜用五行（可选，多选）</legend>
        <div className="flex gap-3">
          {WUXING.map((w) => (
            <label key={w} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={xiyongWuxing.includes(w)}
                onChange={() => handleWuxingToggle(w)}
              />
              {w}
            </label>
          ))}
        </div>
      </fieldset>

      {xiyongWuxing.length > 0 && (
        <fieldset>
          <legend className="text-sm font-medium mb-1">喜用阴阳（可选）</legend>
          <div className="flex gap-4">
            {['阴', '阳'].map((y) => (
              <label key={y} className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="xiyong_yinyang"
                  value={y}
                  checked={xiyongYinyang === y}
                  onChange={(e) => setXiyongYinyang(e.target.value)}
                />
                {y}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <button
        type="submit"
        disabled={disableSubmit}
        className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-40"
      >
        {loading ? '计算中...' : '计算名字'}
      </button>
    </form>
  );
}
