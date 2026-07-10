import type { MingziParams, MingziResponse } from './types';

const BASE = '/api/v1';

export async function computeMingzi(
  params: MingziParams
): Promise<MingziResponse> {
  const sp = new URLSearchParams();
  sp.set('fuxing', params.fuxing);
  sp.set('muxing', params.muxing);
  sp.set('zi', params.zi);
  sp.set('ming', params.ming);
  if (params.hao) sp.set('hao', params.hao);
  if (params.xiyong_wuxing && params.xiyong_wuxing.length > 0) {
    params.xiyong_wuxing.forEach((w) => sp.append('xiyong_wuxing', w));
  }
  if (params.xiyong_yinyang) sp.set('xiyong_yinyang', params.xiyong_yinyang);

  const res = await fetch(`${BASE}/mingzi?${sp}`);
  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new Error(detail?.detail?.[0]?.msg ?? `API error ${res.status}`);
  }
  return res.json();
}
