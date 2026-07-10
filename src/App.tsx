import { useState, useCallback } from 'react';
import NameCalcForm from './components/NameCalcForm';
import NameCalcResult from './components/NameCalcResult';
import { computeMingzi } from './api';
import type { MingziParams, MingziResponse } from './types';

export default function App() {
  const [result, setResult] = useState<MingziResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (params: MingziParams) => {
    setLoading(true);
    setError('');
    try {
      const data = await computeMingzi(params);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '请求失败');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-xl font-bold">姓名计算</h1>
      <NameCalcForm onSubmit={handleSubmit} loading={loading} />
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      {result && <NameCalcResult data={result} />}
    </div>
  );
}
