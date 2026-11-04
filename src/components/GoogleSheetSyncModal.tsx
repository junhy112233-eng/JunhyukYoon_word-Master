import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Copy, ExternalLink, RefreshCw, Send, Database, AlertCircle, FileSpreadsheet } from 'lucide-react';
import {
  getSheetsWebAppUrl,
  setSheetsWebAppUrl,
  getLogHistory,
  sendToGoogleSheet,
  syncPendingLogs,
  getCurrentPlayCount,
  formatTimestamp,
  GamePlayLog
} from '../utils/sheetLogger';

interface GoogleSheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUrlUpdated?: (newUrl: string) => void;
}

const SAMPLE_GAS_CODE = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = e.parameter;
  }
  
  // 구글 시트 1행 헤더:
  // timestamp | play_count | correct_count | wrong_count | avg_taps | sentence_taps
  sheet.appendRow([
    data.timestamp || new Date(),
    data.play_count || 1,
    data.correct_count || 0,
    data.wrong_count || 0,
    data.avg_taps || data.average_taps || 0,
    data.sentence_taps || data.tab_frequency || ""
  ]);
  
  return ContentService.createTextOutput("SUCCESS").setMimeType(ContentService.MimeType.TEXT);
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    e.parameter.timestamp || new Date(),
    e.parameter.play_count || 1,
    e.parameter.correct_count || 0,
    e.parameter.wrong_count || 0,
    e.parameter.avg_taps || e.parameter.average_taps || 0,
    e.parameter.sentence_taps || e.parameter.tab_frequency || ""
  ]);
  return ContentService.createTextOutput("SUCCESS").setMimeType(ContentService.MimeType.TEXT);
}`;

export const GoogleSheetSyncModal: React.FC<GoogleSheetSyncModalProps> = ({
  isOpen,
  onClose,
  onUrlUpdated
}) => {
  const [url, setUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; msg: string } | null>(null);
  const [logs, setLogs] = useState<GamePlayLog[]>([]);
  const [activeTab, setActiveTab] = useState<'settings' | 'history' | 'guide'>('settings');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUrl(getSheetsWebAppUrl());
      setLogs(getLogHistory());
      setTestResult(null);
      setIsSaved(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    setSheetsWebAppUrl(url);
    setIsSaved(true);
    if (onUrlUpdated) onUrlUpdated(url.trim());
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleTestSend = async () => {
    if (!url.trim()) {
      setTestResult({ success: false, msg: '웹 앱 URL을 먼저 입력해주세요.' });
      return;
    }
    setIsTesting(true);
    setTestResult(null);

    const testPayload = {
      timestamp: formatTimestamp(),
      play_count: getCurrentPlayCount() || 1,
      correct_count: 10,
      wrong_count: 0,
      avg_taps: 1.5,
      sentence_taps: 'Q1: 2회, Q2: 1회, Q3: 1회, Q4: 2회, Q5: 1회'
    };

    const res = await sendToGoogleSheet(testPayload, url.trim());
    setIsTesting(false);

    if (res.success) {
      setTestResult({
        success: true,
        msg: '구글 시트로 테스트 데이터(정답 10, 오답 0, 평균 탭 1.5회) 전송 성공! 시트를 확인해보세요.'
      });
      setSheetsWebAppUrl(url);
    } else {
      setTestResult({
        success: false,
        msg: res.error || '전송에 실패했습니다. 웹 앱 URL 배포 권한("모든 사용자")을 확인해주세요.'
      });
    }
  };

  const handleSyncPending = async () => {
    setIsSyncing(true);
    const result = await syncPendingLogs();
    setIsSyncing(false);
    setLogs(getLogHistory());
    setTestResult({
      success: true,
      msg: `미전송 기록 ${result.synced}건 동기화 완료!`
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SAMPLE_GAS_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-base text-white flex items-center gap-1.5">
                  구글 시트 학습 기록 연동
                </h3>
                <p className="text-[11px] text-emerald-100">
                  timestamp, play_count, correct_count, wrong_count 자동 기록
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 active:scale-95 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-2.5 px-3 text-center border-b-2 transition-all ${
                activeTab === 'settings'
                  ? 'border-emerald-600 text-emerald-700 bg-white'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              웹 앱 URL 설정
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2.5 px-3 text-center border-b-2 transition-all flex items-center justify-center gap-1 ${
                activeTab === 'history'
                  ? 'border-emerald-600 text-emerald-700 bg-white'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              플레이 기록 ({logs.length})
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 py-2.5 px-3 text-center border-b-2 transition-all ${
                activeTab === 'guide'
                  ? 'border-emerald-600 text-emerald-700 bg-white'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              연동 가이드 &amp; 코드
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 text-slate-800 text-xs space-y-4">
            {activeTab === 'settings' && (
              <div className="space-y-4">
                {/* Target Column Info Box */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5">
                  <Database className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed text-emerald-900">
                    <p className="font-extrabold mb-1">구글 시트 연동 헤더 열 정보:</p>
                    <code className="bg-emerald-100/90 text-emerald-950 font-bold px-2 py-0.5 rounded text-[11px] block overflow-x-auto">
                      timestamp, play_count, correct_count, wrong_count, avg_taps, sentence_taps
                    </code>
                    <p className="mt-1.5 text-emerald-800">
                      .env.local 의 <b>NEXT_PUBLIC_GOOGLE_SCRIPT_URL</b> 을 기본 연동하여 매 게임 종료 시 각 문장별 탭 빈도와 평균이 실시간으로 구글 시트에 자동 저장됩니다.
                    </p>
                  </div>
                </div>

                {/* Input Field */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    구글 웹 앱 URL (Web App URL)
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Apps Script 웹 앱 배포 시 생성된 URL을 붙여넣으세요.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    {isSaved ? <Check className="w-4 h-4" /> : null}
                    <span>{isSaved ? '저장되었습니다!' : 'URL 저장하기'}</span>
                  </button>

                  <button
                    onClick={handleTestSend}
                    disabled={isTesting}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold rounded-xl transition-all border border-slate-300 flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {isTesting ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                    ) : (
                      <Send className="w-4 h-4 text-emerald-600" />
                    )}
                    <span>테스트 전송</span>
                  </button>
                </div>

                {/* Test Result Message */}
                {testResult && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                      testResult.success
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    {testResult.success ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>{testResult.msg}</div>
                  </div>
                )}

                {/* Auto Recording Status */}
                <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-700">
                    <span>현재까지 총 플레이 횟수:</span>
                    <span className="text-emerald-700 font-black text-sm">{getCurrentPlayCount()}회</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>연동 상태:</span>
                    <span className={url.trim() ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                      {url.trim() ? '● 구글 시트 자동 전송 활성화됨' : '○ 웹 앱 URL 미설정 (로컬에만 저장)'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    로컬 플레이 로그 ({logs.length}개)
                  </span>
                  {logs.some(l => !l.synced) && (
                    <button
                      onClick={handleSyncPending}
                      disabled={isSyncing || !url.trim()}
                      className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 active:scale-95 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>미전송 기록 시트 전송</span>
                    </button>
                  )}
                </div>

                {logs.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    아직 진행한 게임 기록이 없습니다. 게임을 완료하면 자동으로 쌓입니다!
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 max-h-60 overflow-y-auto">
                    {logs.map((log) => (
                      <div key={log.id} className="p-2.5 bg-white hover:bg-slate-50 flex items-center justify-between text-[11px]">
                        <div>
                          <div className="font-black text-slate-800 flex items-center gap-1.5">
                            <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-extrabold text-[10px]">
                              {log.play_count}회차
                            </span>
                            <span>{log.timestamp}</span>
                          </div>
                          <div className="text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                            <span>정답: <b className="text-emerald-600">{log.correct_count}</b></span>
                            <span>오답: <b className="text-rose-600">{log.wrong_count}</b></span>
                            <span>점수: <b>{log.score}점</b></span>
                            {log.avg_taps !== undefined && (
                              <span className="text-indigo-600 font-bold">평균 탭: <b>{log.avg_taps}회</b></span>
                            )}
                          </div>
                        </div>

                        <div>
                          {log.synced ? (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <Check className="w-3 h-3" /> 시트 기록됨
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              대기 중
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="space-y-3.5">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-[11px] text-amber-900 space-y-1">
                  <p className="font-extrabold">📌 구글 시트 연동 초간단 3단계:</p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700 pl-1">
                    <li>
                      새 구글 시트를 만들고 1행에 아래 헤더를 입력합니다:
                      <div className="mt-1 font-mono font-bold text-[10px] bg-white border border-amber-200 p-1.5 rounded text-amber-950 overflow-x-auto">
                        timestamp | play_count | correct_count | wrong_count | avg_taps | sentence_taps
                      </div>
                    </li>
                    <li>
                      시트 상단 메뉴에서 <b>[확장 프로그램] → [Apps Script]</b>를 엽니다.
                    </li>
                    <li>
                      아래 코드를 복사하여 붙여넣은 뒤 <b>[배포] → [새 배포]</b>를 누릅니다.
                      (유형: <b>웹 앱</b>, 액세스 권한: <b>모든 사용자(Anyone)</b> 필수)
                    </li>
                    <li>
                      배포 완료 후 나오는 <b>웹 앱 URL</b>을 복사하여 앱 설정창에 넣으면 끝!
                    </li>
                  </ol>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-700 text-xs">Apps Script 코드:</span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-lg transition-colors active:scale-95"
                    >
                      {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? '복사 완료!' : '코드 복사'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-emerald-400 p-3 rounded-xl text-[10px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
                    {SAMPLE_GAS_CODE}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="py-2 px-5 bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-800 font-bold rounded-xl transition-all text-xs"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
