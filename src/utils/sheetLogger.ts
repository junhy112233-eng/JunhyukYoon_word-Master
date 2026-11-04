import { SentenceTapStat } from '../types';

export interface SheetLogPayload {
  timestamp: string;
  play_count: number;
  correct_count: number;
  wrong_count: number;
  avg_taps?: number; // 각 문장별 평균 탭 빈도
  sentence_taps?: string; // 각 문장별 탭 빈도 요약 (예: "Q1(2회), Q2(1회)...")
  average_taps?: number; // alias
  tab_frequency?: string; // alias
  sentence_tap_details?: Array<{
    index: number;
    sentence: string;
    tapCount: number;
    isCorrect: boolean;
  }>;
}

export interface GamePlayLog extends SheetLogPayload {
  id: string;
  score: number;
  mode?: string;
  synced: boolean;
  syncedAt?: string;
}

const STORAGE_KEY_URL = 'word_master_sheets_webapp_url';
const STORAGE_KEY_PLAY_COUNT = 'word_master_play_count';
const STORAGE_KEY_LOGS = 'word_master_play_logs';

export const DEFAULT_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbykxjMchfcRBKx2-fWAREFO7R0bRvRW8_gFeJsd6KChEbCPAe-X3RYCZh9s2K9hjoEhwg/exec';

export function formatTimestamp(date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Gets the configured Google Apps Script Web App URL.
 * Priority:
 * 1. .env.local: NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 * 2. process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 * 3. localStorage user custom URL
 * 4. VITE_GOOGLE_SHEET_WEBAPP_URL
 * 5. Default provided URL
 */
export function getSheetsWebAppUrl(): string {
  try {
    const nextPublicUrl = (import.meta as any).env?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (nextPublicUrl && String(nextPublicUrl).trim()) {
      return String(nextPublicUrl).trim();
    }
  } catch (e) {
    // ignore
  }

  try {
    if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL) {
      const procUrl = String(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL).trim();
      if (procUrl) return procUrl;
    }
  } catch (e) {
    // ignore
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY_URL);
    if (saved && saved.trim()) return saved.trim();
  } catch (e) {
    // Ignore localStorage errors
  }

  const envUrl = (import.meta as any).env?.VITE_GOOGLE_SHEET_WEBAPP_URL;
  if (envUrl && String(envUrl).trim()) {
    return String(envUrl).trim();
  }

  return DEFAULT_SCRIPT_URL;
}

export function setSheetsWebAppUrl(url: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
  } catch (e) {
    console.error('Failed to save Google Sheet Web App URL to localStorage:', e);
  }
}

export function getCurrentPlayCount(): number {
  try {
    const val = localStorage.getItem(STORAGE_KEY_PLAY_COUNT);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch (e) {
    return 0;
  }
}

export function getLogHistory(): GamePlayLog[] {
  try {
    const val = localStorage.getItem(STORAGE_KEY_LOGS);
    if (!val) return [];
    return JSON.parse(val);
  } catch (e) {
    return [];
  }
}

function saveLogHistory(logs: GamePlayLog[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs.slice(-50)));
  } catch (e) {
    console.error('Failed to save log history:', e);
  }
}

/**
 * Sends the row data (timestamp, play_count, correct_count, wrong_count, avg_taps, sentence_taps)
 * to Google Apps Script Web App.
 */
export async function sendToGoogleSheet(
  payload: SheetLogPayload,
  customUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const targetUrl = (customUrl || getSheetsWebAppUrl()).trim();
  if (!targetUrl) {
    return { success: false, error: '웹 앱 URL이 설정되지 않았습니다.' };
  }

  const normalizedPayload: SheetLogPayload = {
    ...payload,
    average_taps: payload.avg_taps ?? payload.average_taps,
    avg_taps: payload.avg_taps ?? payload.average_taps ?? 1,
    tab_frequency: payload.sentence_taps ?? payload.tab_frequency,
    sentence_taps: payload.sentence_taps ?? payload.tab_frequency ?? ''
  };

  try {
    // Build URL with query params as well to guarantee compatibility with both doGet and doPost
    const urlObj = new URL(targetUrl);
    urlObj.searchParams.set('timestamp', normalizedPayload.timestamp);
    urlObj.searchParams.set('play_count', String(normalizedPayload.play_count));
    urlObj.searchParams.set('correct_count', String(normalizedPayload.correct_count));
    urlObj.searchParams.set('wrong_count', String(normalizedPayload.wrong_count));

    if (normalizedPayload.avg_taps !== undefined) {
      urlObj.searchParams.set('avg_taps', String(normalizedPayload.avg_taps));
      urlObj.searchParams.set('average_taps', String(normalizedPayload.avg_taps));
      urlObj.searchParams.set('avg_tab', String(normalizedPayload.avg_taps));
    }
    if (normalizedPayload.sentence_taps) {
      urlObj.searchParams.set('sentence_taps', normalizedPayload.sentence_taps);
      urlObj.searchParams.set('tab_frequency', normalizedPayload.sentence_taps);
    }

    // Using mode: 'no-cors' allows browser requests to Google Apps Script without CORS blockage
    await fetch(urlObj.toString(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(normalizedPayload)
    });

    return { success: true };
  } catch (err: any) {
    console.warn('Failed to send to Google Sheet via POST, trying GET fallback:', err);
    try {
      const urlObj = new URL(targetUrl);
      urlObj.searchParams.set('timestamp', normalizedPayload.timestamp);
      urlObj.searchParams.set('play_count', String(normalizedPayload.play_count));
      urlObj.searchParams.set('correct_count', String(normalizedPayload.correct_count));
      urlObj.searchParams.set('wrong_count', String(normalizedPayload.wrong_count));
      if (normalizedPayload.avg_taps !== undefined) {
        urlObj.searchParams.set('avg_taps', String(normalizedPayload.avg_taps));
        urlObj.searchParams.set('average_taps', String(normalizedPayload.avg_taps));
      }
      if (normalizedPayload.sentence_taps) {
        urlObj.searchParams.set('sentence_taps', normalizedPayload.sentence_taps);
        urlObj.searchParams.set('tab_frequency', normalizedPayload.sentence_taps);
      }

      await fetch(urlObj.toString(), {
        method: 'GET',
        mode: 'no-cors'
      });
      return { success: true };
    } catch (getErr: any) {
      console.error('Failed to send to Google Sheet via GET fallback:', getErr);
      return { success: false, error: getErr?.message || '네트워크 오류가 발생했습니다.' };
    }
  }
}

/**
 * Records a finished game session:
 * Computes average tap frequency per sentence and sentence tap details,
 * increments play_count, saves to local log history, and dispatches to Google Sheet.
 */
export async function recordGameSession(
  correctCount: number,
  wrongCount: number,
  mode?: string,
  sentenceTapStats?: SentenceTapStat[]
): Promise<{ log: GamePlayLog; sent: boolean; error?: string }> {
  const currentCount = getCurrentPlayCount();
  const nextPlayCount = currentCount + 1;

  try {
    localStorage.setItem(STORAGE_KEY_PLAY_COUNT, String(nextPlayCount));
  } catch (e) {
    // ignore
  }

  // Calculate tap frequency and average
  let avgTaps = 1.0;
  let sentenceTapsSummary = '';
  let sentenceTapDetails: Array<{ index: number; sentence: string; tapCount: number; isCorrect: boolean }> = [];

  if (sentenceTapStats && sentenceTapStats.length > 0) {
    const totalTaps = sentenceTapStats.reduce((acc, curr) => acc + (curr.tapCount || 1), 0);
    avgTaps = parseFloat((totalTaps / sentenceTapStats.length).toFixed(1));
    sentenceTapsSummary = sentenceTapStats
      .map((s, i) => `Q${i + 1}:${s.tapCount || 1}회`)
      .join(', ');
    sentenceTapDetails = sentenceTapStats.map((s, i) => ({
      index: i + 1,
      sentence: s.sentenceText,
      tapCount: s.tapCount || 1,
      isCorrect: s.isCorrect
    }));
  }

  const timestamp = formatTimestamp();
  const score = correctCount * 10;
  const newLog: GamePlayLog = {
    id: `play_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp,
    play_count: nextPlayCount,
    correct_count: correctCount,
    wrong_count: wrongCount,
    avg_taps: avgTaps,
    average_taps: avgTaps,
    sentence_taps: sentenceTapsSummary,
    tab_frequency: sentenceTapsSummary,
    sentence_tap_details: sentenceTapDetails,
    score,
    mode,
    synced: false
  };

  const logs = getLogHistory();
  logs.unshift(newLog);
  saveLogHistory(logs);

  const webAppUrl = getSheetsWebAppUrl();
  if (webAppUrl) {
    const result = await sendToGoogleSheet({
      timestamp: newLog.timestamp,
      play_count: newLog.play_count,
      correct_count: newLog.correct_count,
      wrong_count: newLog.wrong_count,
      avg_taps: newLog.avg_taps,
      average_taps: newLog.avg_taps,
      sentence_taps: newLog.sentence_taps,
      tab_frequency: newLog.sentence_taps,
      sentence_tap_details: newLog.sentence_tap_details
    });

    if (result.success) {
      newLog.synced = true;
      newLog.syncedAt = formatTimestamp();
      saveLogHistory(logs);
      return { log: newLog, sent: true };
    } else {
      return { log: newLog, sent: false, error: result.error };
    }
  }

  return { log: newLog, sent: false, error: '웹 앱 URL 미설정' };
}

/**
 * Sync all pending unsynced logs
 */
export async function syncPendingLogs(): Promise<{ total: number; synced: number }> {
  const logs = getLogHistory();
  const webAppUrl = getSheetsWebAppUrl();
  if (!webAppUrl) return { total: 0, synced: 0 };

  const unsynced = logs.filter(l => !l.synced);
  let synced = 0;

  for (const log of unsynced) {
    const res = await sendToGoogleSheet({
      timestamp: log.timestamp,
      play_count: log.play_count,
      correct_count: log.correct_count,
      wrong_count: log.wrong_count,
      avg_taps: log.avg_taps,
      average_taps: log.avg_taps,
      sentence_taps: log.sentence_taps,
      tab_frequency: log.sentence_taps,
      sentence_tap_details: log.sentence_tap_details
    });
    if (res.success) {
      log.synced = true;
      log.syncedAt = formatTimestamp();
      synced++;
    }
  }

  if (synced > 0) {
    saveLogHistory(logs);
  }

  return { total: unsynced.length, synced };
}
