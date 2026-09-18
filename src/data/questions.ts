import { Question, GameMode } from '../types';

// Helper function to shuffle array items
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* =========================================================================
   CATEGORY 1: THIRD PERSON SINGULAR (-S) MODE (60 QUESTIONS)
   - Half (30) require 3rd person singular verb (-s, -es, -ies): He, She, It, Mom, The dog, etc.
   - Half (30) require base verb (NO -s): I, You, We, They, The cats, My friends, etc.
   Students MUST read the subject to choose correctly!
   ========================================================================= */

export const THIRD_PERSON_QUESTIONS: Question[] = [
  // --- SUBGROUP A: Requires -s / -es / -ies (30 questions) ---
  {
    id: 's-req-1',
    category: 'third_person_s',
    subject: 'She',
    sentenceBefore: 'She',
    sentenceAfter: 'fast in the park every morning.',
    koreanHint: '그녀는 매일 아침 공원에서 빠르게 달려요.',
    timeHint: '주어: She (3인칭 단수) / every morning',
    correctVerb: 'runs',
    options: ['runs', 'run', 'running'],
    ruleExplanation: '주어가 3인칭 단수(She)이므로 동사 원형에 -s를 붙여 "runs"가 정답입니다!',
    recastSentence: 'She runs fast in the park every morning.'
  },
  {
    id: 's-req-2',
    category: 'third_person_s',
    subject: 'He',
    sentenceBefore: 'He',
    sentenceAfter: 'sweet chocolate cookies.',
    koreanHint: '그는 달콤한 초콜릿 쿠키를 좋아해요.',
    timeHint: '주어: He (3인칭 단수)',
    correctVerb: 'likes',
    options: ['likes', 'like', 'liking'],
    ruleExplanation: '주어가 He(그는) 1명이므로 동사에 -s를 붙여 "likes"가 됩니다!',
    recastSentence: 'He likes sweet chocolate cookies.'
  },
  {
    id: 's-req-3',
    category: 'third_person_s',
    subject: 'The cat',
    sentenceBefore: 'The cat',
    sentenceAfter: 'under the warm sofa.',
    koreanHint: '그 고양이는 따뜻한 소파 아래에서 잠을 자요.',
    timeHint: '주어: The cat (고양이 1마리 = It)',
    correctVerb: 'sleeps',
    options: ['sleeps', 'sleep', 'sleeping'],
    ruleExplanation: 'The cat은 단수(1마리) 동물 주어이므로 동사 뒤에 -s를 붙여 "sleeps"!',
    recastSentence: 'The cat sleeps under the warm sofa.'
  },
  {
    id: 's-req-4',
    category: 'third_person_s',
    subject: 'My mom',
    sentenceBefore: 'My mom',
    sentenceAfter: 'delicious pizza on Friday.',
    koreanHint: '우리 엄마는 금요일마다 맛있는 피자를 요리해요.',
    timeHint: '주어: My mom (3인칭 단수 = She)',
    correctVerb: 'cooks',
    options: ['cooks', 'cook', 'cooking'],
    ruleExplanation: 'My mom(우리 엄마)은 3인칭 단수이므로 동사에 -s를 붙여 "cooks"!',
    recastSentence: 'My mom cooks delicious pizza on Friday.'
  },
  {
    id: 's-req-5',
    category: 'third_person_s',
    subject: 'Tom',
    sentenceBefore: 'Tom',
    sentenceAfter: 'cartoons every Saturday.',
    koreanHint: '톰은 매주 토요일 만화를 봐요.',
    timeHint: '주어: Tom (1명) / -ch로 끝남',
    correctVerb: 'watches',
    options: ['watches', 'watch', 'watching'],
    ruleExplanation: '주어가 3인칭 단수(Tom)이고 -ch로 끝나므로 -es를 붙여 "watches"!',
    recastSentence: 'Tom watches cartoons every Saturday.'
  },
  {
    id: 's-req-6',
    category: 'third_person_s',
    subject: 'She',
    sentenceBefore: 'She',
    sentenceAfter: 'her hands before eating.',
    koreanHint: '그녀는 밥 먹기 전에 손을 씻어요.',
    timeHint: '주어: She / -sh로 끝남',
    correctVerb: 'washes',
    options: ['washes', 'wash', 'washing'],
    ruleExplanation: '주어가 She이고 -sh로 끝나는 동사는 -es를 붙여 "washes"가 됩니다!',
    recastSentence: 'She washes her hands before eating.'
  },
  {
    id: 's-req-7',
    category: 'third_person_s',
    subject: 'The puppy',
    sentenceBefore: 'The puppy',
    sentenceAfter: 'high to catch the ball.',
    koreanHint: '그 강아지는 공을 잡으려고 높이 뛰어요.',
    timeHint: '주어: The puppy (강아지 1마리)',
    correctVerb: 'jumps',
    options: ['jumps', 'jump', 'jumping'],
    ruleExplanation: 'The puppy는 1마리(단수)이므로 jump 뒤에 -s를 붙인 "jumps"가 정답입니다!',
    recastSentence: 'The puppy jumps high to catch the ball.'
  },
  {
    id: 's-req-8',
    category: 'third_person_s',
    subject: 'My brother',
    sentenceBefore: 'My brother',
    sentenceAfter: 'fun comic books in his room.',
    koreanHint: '남동생은 방에서 재미있는 만화책을 읽어요.',
    timeHint: '주어: My brother (3인칭 단수 = He)',
    correctVerb: 'reads',
    options: ['reads', 'read', 'reading'],
    ruleExplanation: 'My brother는 3인칭 단수(He)이므로 동사에 -s를 붙여 "reads"가 맞아요!',
    recastSentence: 'My brother reads fun comic books in his room.'
  },
  {
    id: 's-req-9',
    category: 'third_person_s',
    subject: 'The teacher',
    sentenceBefore: 'The teacher',
    sentenceAfter: 'English with a big smile.',
    koreanHint: '선생님은 환한 미소로 영어를 가르쳐요.',
    timeHint: '주어: The teacher (1명) / -ch로 끝남',
    correctVerb: 'teaches',
    options: ['teaches', 'teach', 'teaching'],
    ruleExplanation: 'The teacher(1명) 뒤에 -ch로 끝나는 teach는 -es를 붙여 "teaches"가 됩니다!',
    recastSentence: 'The teacher teaches English with a big smile.'
  },
  {
    id: 's-req-10',
    category: 'third_person_s',
    subject: 'A little bird',
    sentenceBefore: 'A little bird',
    sentenceAfter: 'in the high blue sky.',
    koreanHint: '작은 새가 높은 파란 하늘을 날아요.',
    timeHint: '주어: A little bird (1마리) / fly 변형',
    correctVerb: 'flies',
    options: ['flies', 'fly', 'flys'],
    ruleExplanation: 'fly는 자음+y로 끝나므로 y를 i로 고치고 -es를 붙여 "flies"가 됩니다!',
    recastSentence: 'A little bird flies in the high blue sky.'
  },
  {
    id: 's-req-11',
    category: 'third_person_s',
    subject: 'Minho',
    sentenceBefore: 'Minho',
    sentenceAfter: 'to school at eight every day.',
    koreanHint: '민호는 매일 8시에 학교에 가요.',
    timeHint: '주어: Minho (1명) / go 변형',
    correctVerb: 'goes',
    options: ['goes', 'go', 'going'],
    ruleExplanation: '주어가 3인칭 단수일 때 go 뒤에는 -es를 붙여 "goes"가 됩니다!',
    recastSentence: 'Minho goes to school at eight every day.'
  },
  {
    id: 's-req-12',
    category: 'third_person_s',
    subject: 'My dad',
    sentenceBefore: 'My dad',
    sentenceAfter: 'the dishes after dinner.',
    koreanHint: '아빠는 저녁 식사 후 설거지를 해요.',
    timeHint: '주어: My dad (3인칭 단수) / do 변형',
    correctVerb: 'does',
    options: ['does', 'do', 'doing'],
    ruleExplanation: '주어가 3인칭 단수일 때 do 뒤에는 -es를 붙여 "does"가 맞습니다!',
    recastSentence: 'My dad does the dishes after dinner.'
  },
  {
    id: 's-req-13',
    category: 'third_person_s',
    subject: 'Jenny',
    sentenceBefore: 'Jenny',
    sentenceAfter: 'math hard every night.',
    koreanHint: '제니는 매일 밤 수학을 열심히 공부해요.',
    timeHint: '주어: Jenny (단수) / study 변형',
    correctVerb: 'studies',
    options: ['studies', 'study', 'studys'],
    ruleExplanation: 'study는 자음+y로 끝나므로 y를 i로 바꾸고 -es를 붙여 "studies"!',
    recastSentence: 'Jenny studies math hard every night.'
  },
  {
    id: 's-req-14',
    category: 'third_person_s',
    subject: 'The baby',
    sentenceBefore: 'The baby',
    sentenceAfter: 'when she is hungry.',
    koreanHint: '아기는 배가 고플 때 울어요.',
    timeHint: '주어: The baby (1명) / cry 변형',
    correctVerb: 'cries',
    options: ['cries', 'cry', 'crying'],
    ruleExplanation: 'cry는 자음+y로 끝나므로 y를 i로 고치고 -es를 붙여 "cries"!',
    recastSentence: 'The baby cries when she is hungry.'
  },
  {
    id: 's-req-15',
    category: 'third_person_s',
    subject: 'He',
    sentenceBefore: 'He',
    sentenceAfter: 'soccer with his friends.',
    koreanHint: '그는 친구들과 축구를 해요.',
    timeHint: '주어: He / play 변형',
    correctVerb: 'plays',
    options: ['plays', 'play', 'plaies'],
    ruleExplanation: 'play는 모음(a)+y이므로 y를 그대로 두고 -s만 붙여 "plays"가 됩니다!',
    recastSentence: 'He plays soccer with his friends.'
  },
  {
    id: 's-req-16',
    category: 'third_person_s',
    subject: 'She',
    sentenceBefore: 'She',
    sentenceAfter: 'a cute blue bicycle.',
    koreanHint: '그녀는 귀여운 파란 자전거를 타요.',
    timeHint: '주어: She (3인칭 단수)',
    correctVerb: 'rides',
    options: ['rides', 'ride', 'riding'],
    ruleExplanation: '주어가 She이므로 동사에 -s를 붙여 "rides"가 정답입니다!',
    recastSentence: 'She rides a cute blue bicycle.'
  },
  {
    id: 's-req-17',
    category: 'third_person_s',
    subject: 'The baker',
    sentenceBefore: 'The baker',
    sentenceAfter: 'fresh bread every morning.',
    koreanHint: '제빵사는 매일 아침 신선한 빵을 구워요.',
    timeHint: '주어: The baker (제빵사 1명)',
    correctVerb: 'bakes',
    options: ['bakes', 'bake', 'baking'],
    ruleExplanation: '주어가 1명(The baker = He/She)이므로 bake 뒤에 -s를 붙여 "bakes"!',
    recastSentence: 'The baker bakes fresh bread every morning.'
  },
  {
    id: 's-req-18',
    category: 'third_person_s',
    subject: 'It',
    sentenceBefore: 'It',
    sentenceAfter: 'a lot in July.',
    koreanHint: '7월에는 비가 많이 와요.',
    timeHint: '주어: It (날씨를 나타내는 3인칭 단수)',
    correctVerb: 'rains',
    options: ['rains', 'rain', 'raining'],
    ruleExplanation: '날씨를 나타내는 It은 3인칭 단수이므로 rain 뒤에 -s를 붙여 "rains"!',
    recastSentence: 'It rains a lot in July.'
  },
  {
    id: 's-req-19',
    category: 'third_person_s',
    subject: 'My sister',
    sentenceBefore: 'My sister',
    sentenceAfter: 'her teeth twice a day.',
    koreanHint: '내 여동생은 하루에 두 번 양치질을 해요.',
    timeHint: '주어: My sister / -sh로 끝남',
    correctVerb: 'brushes',
    options: ['brushes', 'brush', 'brushing'],
    ruleExplanation: 'My sister(단수) 주어에 -sh로 끝나는 brush는 -es를 붙여 "brushes"!',
    recastSentence: 'My sister brushes her teeth twice a day.'
  },
  {
    id: 's-req-20',
    category: 'third_person_s',
    subject: 'The sun',
    sentenceBefore: 'The sun',
    sentenceAfter: 'brightly in the morning.',
    koreanHint: '태양은 아침에 밝게 빛나요.',
    timeHint: '주어: The sun (단수)',
    correctVerb: 'shines',
    options: ['shines', 'shine', 'shining'],
    ruleExplanation: 'The sun(태양 1개)은 3인칭 단수이므로 shine에 -s를 붙여 "shines"!',
    recastSentence: 'The sun shines brightly in the morning.'
  },
  {
    id: 's-req-21',
    category: 'third_person_s',
    subject: 'Leo',
    sentenceBefore: 'Leo',
    sentenceAfter: 'a heavy backpack to school.',
    koreanHint: '레오는 무거운 책가방을 학교에 들고 다녀요.',
    timeHint: '주어: Leo (단수) / carry 변형',
    correctVerb: 'carries',
    options: ['carries', 'carry', 'carrys'],
    ruleExplanation: 'carry는 자음+y로 끝나므로 y를 i로 바꾸고 -es를 붙여 "carries"!',
    recastSentence: 'Leo carries a heavy backpack to school.'
  },
  {
    id: 's-req-22',
    category: 'third_person_s',
    subject: 'She',
    sentenceBefore: 'She',
    sentenceAfter: 'pictures of cute animals.',
    koreanHint: '그녀는 귀여운 동물 사진을 그려요.',
    timeHint: '주어: She (3인칭 단수)',
    correctVerb: 'draws',
    options: ['draws', 'draw', 'drawing'],
    ruleExplanation: '주어가 She이므로 draw 뒤에 -s를 붙여 "draws"가 됩니다!',
    recastSentence: 'She draws pictures of cute animals.'
  },
  {
    id: 's-req-23',
    category: 'third_person_s',
    subject: 'The train',
    sentenceBefore: 'The train',
    sentenceAfter: 'here at six o’clock.',
    koreanHint: '그 기차는 6시에 여기에 도착해요.',
    timeHint: '주어: The train (단수)',
    correctVerb: 'arrives',
    options: ['arrives', 'arrive', 'arriving'],
    ruleExplanation: '기차 1대(The train = It)는 3인칭 단수이므로 "arrives"가 맞아요!',
    recastSentence: 'The train arrives here at six o’clock.'
  },
  {
    id: 's-req-24',
    category: 'third_person_s',
    subject: 'He',
    sentenceBefore: 'He',
    sentenceAfter: 'warm milk before sleeping.',
    koreanHint: '그는 자기 전에 따뜻한 우유를 마셔요.',
    timeHint: '주어: He (3인칭 단수)',
    correctVerb: 'drinks',
    options: ['drinks', 'drink', 'drinking'],
    ruleExplanation: '주어가 He(단수)이므로 drink 뒤에 -s를 붙여 "drinks"가 정답입니다!',
    recastSentence: 'He drinks warm milk before sleeping.'
  },
  {
    id: 's-req-25',
    category: 'third_person_s',
    subject: 'The boy',
    sentenceBefore: 'The boy',
    sentenceAfter: 'loudly during music class.',
    koreanHint: '그 소년은 음악 시간에 큰 소리로 노래해요.',
    timeHint: '주어: The boy (소년 1명)',
    correctVerb: 'sings',
    options: ['sings', 'sing', 'singing'],
    ruleExplanation: 'The boy(1명)는 3인칭 단수이므로 sing 뒤에 -s를 붙여 "sings"!',
    recastSentence: 'The boy sings loudly during music class.'
  },
  {
    id: 's-req-26',
    category: 'third_person_s',
    subject: 'She',
    sentenceBefore: 'She',
    sentenceAfter: 'sweet strawberries.',
    koreanHint: '그녀는 달콤한 딸기를 원해요.',
    timeHint: '주어: She',
    correctVerb: 'wants',
    options: ['wants', 'want', 'wanting'],
    ruleExplanation: '주어가 She이므로 want 뒤에 -s를 붙여 "wants"가 됩니다!',
    recastSentence: 'She wants sweet strawberries.'
  },
  {
    id: 's-req-27',
    category: 'third_person_s',
    subject: 'The bus',
    sentenceBefore: 'The bus',
    sentenceAfter: 'in front of my house.',
    koreanHint: '그 버스는 우리 집 앞에 멈춰요.',
    timeHint: '주어: The bus (단수)',
    correctVerb: 'stops',
    options: ['stops', 'stop', 'stopping'],
    ruleExplanation: 'The bus(버스 1대)는 3인칭 단수이므로 stop 뒤에 -s를 붙여 "stops"!',
    recastSentence: 'The bus stops in front of my house.'
  },
  {
    id: 's-req-28',
    category: 'third_person_s',
    subject: 'My aunt',
    sentenceBefore: 'My aunt',
    sentenceAfter: 'in a cozy apartment.',
    koreanHint: '우리 이모는 아늑한 아파트에 살아요.',
    timeHint: '주어: My aunt (단수 = She)',
    correctVerb: 'lives',
    options: ['lives', 'live', 'living'],
    ruleExplanation: 'My aunt는 3인칭 단수이므로 live 뒤에 -s를 붙여 "lives"가 맞습니다!',
    recastSentence: 'My aunt lives in a cozy apartment.'
  },
  {
    id: 's-req-29',
    category: 'third_person_s',
    subject: 'He',
    sentenceBefore: 'He',
    sentenceAfter: 'the heavy box for grandma.',
    koreanHint: '그는 할머니를 위해 무거운 상자를 밀어요.',
    timeHint: '주어: He / -sh로 끝남',
    correctVerb: 'pushes',
    options: ['pushes', 'push', 'pushing'],
    ruleExplanation: '주어가 He이고 -sh로 끝나므로 -es를 붙여 "pushes"가 됩니다!',
    recastSentence: 'He pushes the heavy box for grandma.'
  },
  {
    id: 's-req-30',
    category: 'third_person_s',
    subject: 'The frog',
    sentenceBefore: 'The frog',
    sentenceAfter: 'into the cool pond.',
    koreanHint: '그 개구리는 시원한 연못으로 뛰어들어요.',
    timeHint: '주어: The frog (1마리)',
    correctVerb: 'jumps',
    options: ['jumps', 'jump', 'jumping'],
    ruleExplanation: 'The frog는 단수이므로 동사 뒤에 -s를 붙여 "jumps"!',
    recastSentence: 'The frog jumps into the cool pond.'
  },

  // --- SUBGROUP B: Requires BASE VERB (NO -s) (30 questions) ---
  // Subjects: I, You, We, They, My friends, The cats, Tom and Jane, etc.
  {
    id: 's-base-1',
    category: 'third_person_s',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'fast in the playground every day.',
    koreanHint: '나는 매일 운동장에서 빠르게 달려요.',
    timeHint: '주어: I (1인칭은 -s를 붙이지 않아요!)',
    correctVerb: 'run',
    options: ['run', 'runs', 'running'],
    ruleExplanation: '주어가 I(나)일 때는 동사에 -s를 붙이지 않고 동사원형 "run"을 써야 해요!',
    recastSentence: 'I run fast in the playground every day.'
  },
  {
    id: 's-base-2',
    category: 'third_person_s',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'delicious pizza on Friday.',
    koreanHint: '그들은 금요일마다 맛있는 피자를 요리해요.',
    timeHint: '주어: They (복수 주어는 -s 안 붙임)',
    correctVerb: 'cook',
    options: ['cook', 'cooks', 'cooking'],
    ruleExplanation: '주어가 They(그들 - 여러 명)일 때는 동사에 -s를 붙이지 않는 "cook"이 맞아요!',
    recastSentence: 'They cook delicious pizza on Friday.'
  },
  {
    id: 's-base-3',
    category: 'third_person_s',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'English hard in class.',
    koreanHint: '우리는 수업 시간에 영어를 열심히 공부해요.',
    timeHint: '주어: We (우리 - 복수)',
    correctVerb: 'study',
    options: ['study', 'studies', 'studys'],
    ruleExplanation: '주어가 We(우리)일 때는 -s나 -ies를 붙이지 않고 원래 형태 "study"를 써야 해요!',
    recastSentence: 'We study English hard in class.'
  },
  {
    id: 's-base-4',
    category: 'third_person_s',
    subject: 'You',
    sentenceBefore: 'You',
    sentenceAfter: 'sweet chocolate cookies.',
    koreanHint: '너는 달콤한 초콜릿 쿠키를 좋아하는구나.',
    timeHint: '주어: You (2인칭은 -s 안 붙임)',
    correctVerb: 'like',
    options: ['like', 'likes', 'liking'],
    ruleExplanation: '주어가 You(너)일 때는 -s를 붙이지 않고 원형 "like"를 씁니다!',
    recastSentence: 'You like sweet chocolate cookies.'
  },
  {
    id: 's-base-5',
    category: 'third_person_s',
    subject: 'My friends',
    sentenceBefore: 'My friends',
    sentenceAfter: 'soccer after school.',
    koreanHint: '내 친구들은 방과 후에 축구를 해요.',
    timeHint: '주어: My friends (친구들 - 복수)',
    correctVerb: 'play',
    options: ['play', 'plays', 'playing'],
    ruleExplanation: 'My friends는 여러 명(복수)이므로 동사에 -s를 붙이지 않고 "play"가 정답입니다!',
    recastSentence: 'My friends play soccer after school.'
  },
  {
    id: 's-base-6',
    category: 'third_person_s',
    subject: 'The cats',
    sentenceBefore: 'The cats',
    sentenceAfter: 'on the sofa all day.',
    koreanHint: '그 고양이들은 하루 종일 소파에서 잠을 자요.',
    timeHint: '주어: The cats (고양이들 - 복수)',
    correctVerb: 'sleep',
    options: ['sleep', 'sleeps', 'sleeping'],
    ruleExplanation: 'The cats는 여러 마리(복수)이므로 동사 뒤에 -s를 붙이지 않는 "sleep"이 맞습니다!',
    recastSentence: 'The cats sleep on the sofa all day.'
  },
  {
    id: 's-base-7',
    category: 'third_person_s',
    subject: 'Tom and Jane',
    sentenceBefore: 'Tom and Jane',
    sentenceAfter: 'to school together.',
    koreanHint: '톰과 제인은 함께 학교에 가요.',
    timeHint: '주어: Tom and Jane (두 명 - 복수)',
    correctVerb: 'go',
    options: ['go', 'goes', 'going'],
    ruleExplanation: 'Tom and Jane은 2명(They)이므로 -es를 붙이지 않고 동사원형 "go"가 정답!',
    recastSentence: 'Tom and Jane go to school together.'
  },
  {
    id: 's-base-8',
    category: 'third_person_s',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'my hands before lunch.',
    koreanHint: '나는 점심 먹기 전에 손을 씻어요.',
    timeHint: '주어: I (1인칭)',
    correctVerb: 'wash',
    options: ['wash', 'washes', 'washing'],
    ruleExplanation: '주어가 I일 때는 -es를 붙이지 않고 기본 형태 "wash"를 씁니다!',
    recastSentence: 'I wash my hands before lunch.'
  },
  {
    id: 's-base-9',
    category: 'third_person_s',
    subject: 'Birds',
    sentenceBefore: 'Birds',
    sentenceAfter: 'high in the sunny sky.',
    koreanHint: '새들은 맑은 하늘 높이 날아요.',
    timeHint: '주어: Birds (새들 - 복수)',
    correctVerb: 'fly',
    options: ['fly', 'flies', 'flying'],
    ruleExplanation: '주어가 Birds(복수)이므로 -ies를 붙이지 않고 원형 "fly"가 맞아요!',
    recastSentence: 'Birds fly in the sunny sky.'
  },
  {
    id: 's-base-10',
    category: 'third_person_s',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'cartoons every Sunday morning.',
    koreanHint: '우리는 일요일 아침마다 만화를 봐요.',
    timeHint: '주어: We (우리)',
    correctVerb: 'watch',
    options: ['watch', 'watches', 'watching'],
    ruleExplanation: '주어가 We이므로 -es를 붙이지 않는 "watch"가 맞습니다!',
    recastSentence: 'We watch cartoons every Sunday morning.'
  },
  {
    id: 's-base-11',
    category: 'third_person_s',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'my teeth every morning.',
    koreanHint: '나는 매일 아침 양치질을 해요.',
    timeHint: '주어: I (1인칭)',
    correctVerb: 'brush',
    options: ['brush', 'brushes', 'brushing'],
    ruleExplanation: '주어가 I일 때는 -es를 붙이지 않고 "brush"를 씁니다!',
    recastSentence: 'I brush my teeth every morning.'
  },
  {
    id: 's-base-12',
    category: 'third_person_s',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'comic books at the library.',
    koreanHint: '그들은 도서관에서 만화책을 읽어요.',
    timeHint: '주어: They (그들)',
    correctVerb: 'read',
    options: ['read', 'reads', 'reading'],
    ruleExplanation: 'They(그들) 뒤에는 -s를 붙이지 않고 동사원형 "read"가 정답!',
    recastSentence: 'They read comic books at the library.'
  },
  {
    id: 's-base-13',
    category: 'third_person_s',
    subject: 'You',
    sentenceBefore: 'You',
    sentenceAfter: 'very high, good job!',
    koreanHint: '너 정말 높이 뛰는구나, 잘했어!',
    timeHint: '주어: You (2인칭)',
    correctVerb: 'jump',
    options: ['jump', 'jumps', 'jumping'],
    ruleExplanation: '주어가 You일 때는 -s를 붙이지 않고 "jump"를 써야 합니다!',
    recastSentence: 'You jump very high, good job!'
  },
  {
    id: 's-base-14',
    category: 'third_person_s',
    subject: 'The students',
    sentenceBefore: 'The students',
    sentenceAfter: 'their homework in the afternoon.',
    koreanHint: '학생들은 오후에 숙제를 해요.',
    timeHint: '주어: The students (학생들 - 복수)',
    correctVerb: 'do',
    options: ['do', 'does', 'doing'],
    ruleExplanation: '주어가 The students(복수)이므로 does가 아니라 원형 "do"가 맞아요!',
    recastSentence: 'The students do their homework in the afternoon.'
  },
  {
    id: 's-base-15',
    category: 'third_person_s',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'warm milk before going to bed.',
    koreanHint: '나는 잠자리에 들기 전에 따뜻한 우유를 마셔요.',
    timeHint: '주어: I',
    correctVerb: 'drink',
    options: ['drink', 'drinks', 'drinking'],
    ruleExplanation: '주어가 I이므로 -s를 붙이지 않고 "drink"가 정답입니다!',
    recastSentence: 'I drink warm milk before going to bed.'
  },
  {
    id: 's-base-16',
    category: 'third_person_s',
    subject: 'The dogs',
    sentenceBefore: 'The dogs',
    sentenceAfter: 'loudly at night.',
    koreanHint: '그 개들은 밤에 크게 짖어요.',
    timeHint: '주어: The dogs (복수)',
    correctVerb: 'bark',
    options: ['bark', 'barks', 'barking'],
    ruleExplanation: 'The dogs는 복수(여러 마리)이므로 -s를 붙이지 않고 "bark"!',
    recastSentence: 'The dogs bark loudly at night.'
  },
  {
    id: 's-base-17',
    category: 'third_person_s',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'our bikes in the park.',
    koreanHint: '우리는 공원에서 자전거를 타요.',
    timeHint: '주어: We',
    correctVerb: 'ride',
    options: ['ride', 'rides', 'riding'],
    ruleExplanation: '주어가 We이므로 -s를 붙이지 않고 "ride"가 맞습니다!',
    recastSentence: 'We ride our bikes in the park.'
  },
  {
    id: 's-base-18',
    category: 'third_person_s',
    subject: 'You and I',
    sentenceBefore: 'You and I',
    sentenceAfter: 'our teacher every day.',
    koreanHint: '너와 나는 매일 선생님을 도와드려.',
    timeHint: '주어: You and I (우리 = 복수)',
    correctVerb: 'help',
    options: ['help', 'helps', 'helping'],
    ruleExplanation: 'You and I는 "우리(We)"이므로 동사에 -s를 붙이지 않는 "help"가 정답!',
    recastSentence: 'You and I help our teacher every day.'
  },
  {
    id: 's-base-19',
    category: 'third_person_s',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'cheerful songs in the choir.',
    koreanHint: '그들은 합창단에서 신나는 노래를 불러요.',
    timeHint: '주어: They',
    correctVerb: 'sing',
    options: ['sing', 'sings', 'singing'],
    ruleExplanation: '주어가 They이므로 -s를 붙이지 않는 "sing"이 맞습니다!',
    recastSentence: 'They sing cheerful songs in the choir.'
  },
  {
    id: 's-base-20',
    category: 'third_person_s',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'sweet apples every morning.',
    koreanHint: '나는 매일 아침 달콤한 사과를 원해요.',
    timeHint: '주어: I',
    correctVerb: 'want',
    options: ['want', 'wants', 'wanting'],
    ruleExplanation: '주어가 I이므로 want 뒤에 -s를 붙이지 않습니다!',
    recastSentence: 'I want sweet apples every morning.'
  },
  {
    id: 's-base-21',
    category: 'third_person_s',
    subject: 'Children',
    sentenceBefore: 'Children',
    sentenceAfter: 'when they watch funny clowns.',
    koreanHint: '아이들은 우스꽝스러운 광대를 볼 때 웃어요.',
    timeHint: '주어: Children (아이들 - 복수)',
    correctVerb: 'laugh',
    options: ['laugh', 'laughs', 'laughing'],
    ruleExplanation: 'Children은 복수(여러 명)이므로 -s를 붙이지 않고 "laugh"!',
    recastSentence: 'Children laugh when they watch funny clowns.'
  },
  {
    id: 's-base-22',
    category: 'third_person_s',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'in Seoul with our parents.',
    koreanHint: '우리는 부모님과 함께 서울에 살아요.',
    timeHint: '주어: We',
    correctVerb: 'live',
    options: ['live', 'lives', 'living'],
    ruleExplanation: '주어가 We이므로 -s를 붙이지 않고 원형 "live"를 씁니다!',
    recastSentence: 'We live in Seoul with our parents.'
  },
  {
    id: 's-base-23',
    category: 'third_person_s',
    subject: 'The monkeys',
    sentenceBefore: 'The monkeys',
    sentenceAfter: 'tall banana trees easily.',
    koreanHint: '원숭이들은 높은 바나나 나무를 쉽게 올라가요.',
    timeHint: '주어: The monkeys (복수)',
    correctVerb: 'climb',
    options: ['climb', 'climbs', 'climbing'],
    ruleExplanation: 'The monkeys는 복수이므로 -s를 붙이지 않는 "climb"가 정답입니다!',
    recastSentence: 'The monkeys climb tall banana trees easily.'
  },
  {
    id: 's-base-24',
    category: 'third_person_s',
    subject: 'You',
    sentenceBefore: 'You',
    sentenceAfter: 'pictures very nicely.',
    koreanHint: '너는 그림을 정말 잘 그리는구나.',
    timeHint: '주어: You',
    correctVerb: 'draw',
    options: ['draw', 'draws', 'drawing'],
    ruleExplanation: '주어가 You일 때는 -s를 붙이지 않고 원형 "draw"를 써요!',
    recastSentence: 'You draw pictures very nicely.'
  },
  {
    id: 's-base-25',
    category: 'third_person_s',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'a big schoolbag every day.',
    koreanHint: '나는 매일 큰 책가방을 메고 다녀요.',
    timeHint: '주어: I',
    correctVerb: 'carry',
    options: ['carry', 'carries', 'carrys'],
    ruleExplanation: '주어가 I이므로 carries가 아니라 원형 "carry"가 정답입니다!',
    recastSentence: 'I carry a big schoolbag every day.'
  },
  {
    id: 's-base-26',
    category: 'third_person_s',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'at the school bus stop.',
    koreanHint: '그들은 스쿨버스 정류장에서 기다려요.',
    timeHint: '주어: They',
    correctVerb: 'wait',
    options: ['wait', 'waits', 'waiting'],
    ruleExplanation: 'They 뒤에는 -s를 붙이지 않고 "wait"를 씁니다!',
    recastSentence: 'They wait at the school bus stop.'
  },
  {
    id: 's-base-27',
    category: 'third_person_s',
    subject: 'Fish',
    sentenceBefore: 'Fish',
    sentenceAfter: 'fast in the clear river.',
    koreanHint: '물고기들은 맑은 강에서 빠르게 수영해요.',
    timeHint: '주어: Fish (물고기들 - 복수)',
    correctVerb: 'swim',
    options: ['swim', 'swims', 'swimming'],
    ruleExplanation: '복수 주어 Fish 뒤에는 -s를 붙이지 않는 "swim"이 맞아요!',
    recastSentence: 'Fish swim fast in the clear river.'
  },
  {
    id: 's-base-28',
    category: 'third_person_s',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'delicious cookies on Sunday.',
    koreanHint: '우리는 일요일에 맛있는 쿠키를 구워요.',
    timeHint: '주어: We',
    correctVerb: 'bake',
    options: ['bake', 'bakes', 'baking'],
    ruleExplanation: 'We 뒤에는 -s를 붙이지 않고 기본형 "bake"를 씁니다!',
    recastSentence: 'We bake delicious cookies on Sunday.'
  },
  {
    id: 's-base-29',
    category: 'third_person_s',
    subject: 'You',
    sentenceBefore: 'You',
    sentenceAfter: 'good English questions.',
    koreanHint: '너는 훌륭한 영어 질문을 하는구나.',
    timeHint: '주어: You',
    correctVerb: 'ask',
    options: ['ask', 'asks', 'asking'],
    ruleExplanation: '주어가 You이므로 -s를 붙이지 않는 "ask"가 정답!',
    recastSentence: 'You ask good English questions.'
  },
  {
    id: 's-base-30',
    category: 'third_person_s',
    subject: 'My cousins',
    sentenceBefore: 'My cousins',
    sentenceAfter: 'their room on Saturday.',
    koreanHint: '내 사촌들은 토요일에 방을 청소해요.',
    timeHint: '주어: My cousins (사촌들 - 복수)',
    correctVerb: 'clean',
    options: ['clean', 'cleans', 'cleaning'],
    ruleExplanation: 'My cousins(복수)이므로 -s를 붙이지 않는 "clean"이 맞습니다!',
    recastSentence: 'My cousins clean their room on Saturday.'
  }
];

/* =========================================================================
   CATEGORY 2: PAST TENSE (-ED) MODE (60 QUESTIONS)
   - Half (30) require PAST TENSE (-ed): yesterday, last night, two days ago, then, etc.
   - Half (30) require PRESENT / BASE FORM (NO -ed): every day, now, always, usually, on Sundays.
   Students MUST read the time cue to decide whether -ed is required or not!
   ========================================================================= */

export const PAST_ED_QUESTIONS: Question[] = [
  // --- SUBGROUP A: Requires -ed (PAST TENSE) (30 questions) ---
  {
    id: 'ed-req-1',
    category: 'past_ed',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'soccer with my friends yesterday.',
    koreanHint: '나는 어제 친구들과 축구를 했어요.',
    timeHint: 'yesterday (어제 - 과거 시점)',
    correctVerb: 'played',
    options: ['played', 'play', 'plays'],
    ruleExplanation: '어제(yesterday) 있었던 과거 일이므로 play 뒤에 -ed를 붙인 "played"가 맞습니다!',
    recastSentence: 'I played soccer with my friends yesterday.'
  },
  {
    id: 'ed-req-2',
    category: 'past_ed',
    subject: 'She',
    sentenceBefore: 'She',
    sentenceAfter: 'her room yesterday afternoon.',
    koreanHint: '그녀는 어제 오후에 방을 청소했어요.',
    timeHint: 'yesterday afternoon (어제 오후)',
    correctVerb: 'cleaned',
    options: ['cleaned', 'cleans', 'clean'],
    ruleExplanation: '어제 오후(yesterday afternoon)는 과거이므로 -ed를 붙여 "cleaned"가 정답입니다!',
    recastSentence: 'She cleaned her room yesterday afternoon.'
  },
  {
    id: 'ed-req-3',
    category: 'past_ed',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'to school two days ago.',
    koreanHint: '그들은 이틀 전에 학교까지 걸어갔어요.',
    timeHint: 'two days ago (이틀 전 - 과거)',
    correctVerb: 'walked',
    options: ['walked', 'walk', 'walks'],
    ruleExplanation: '이틀 전(two days ago)은 이미 지난 과거이므로 walk에 -ed를 붙여 "walked"!',
    recastSentence: 'They walked to school two days ago.'
  },
  {
    id: 'ed-req-4',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'a funny movie last night.',
    koreanHint: '우리는 어젯밤에 재미있는 영화를 봤어요.',
    timeHint: 'last night (어젯밤 - 과거)',
    correctVerb: 'watched',
    options: ['watched', 'watch', 'watches'],
    ruleExplanation: '어젯밤(last night)에 일어난 과거 사실이므로 watch 뒤에 -ed를 붙여 "watched"!',
    recastSentence: 'We watched a funny movie last night.'
  },
  {
    id: 'ed-req-5',
    category: 'past_ed',
    subject: 'He',
    sentenceBefore: 'He',
    sentenceAfter: 'his grandma last Sunday.',
    koreanHint: '그는 지난 일요일에 할머니 댁을 방문했어요.',
    timeHint: 'last Sunday (지난 일요일 - 과거)',
    correctVerb: 'visited',
    options: ['visited', 'visits', 'visit'],
    ruleExplanation: '지난 일요일(last Sunday)은 과거 시점이므로 visit에 -ed를 붙여 "visited"!',
    recastSentence: 'He visited his grandma last Sunday.'
  },
  {
    id: 'ed-req-6',
    category: 'past_ed',
    subject: 'Minho',
    sentenceBefore: 'Minho',
    sentenceAfter: 'for the bus for an hour yesterday.',
    koreanHint: '민호는 어제 한 시간 동안 버스를 기다렸어요.',
    timeHint: 'yesterday (어제)',
    correctVerb: 'waited',
    options: ['waited', 'waits', 'wait'],
    ruleExplanation: '어제(yesterday) 일어난 일이므로 wait 뒤에 -ed를 붙여 "waited"가 정답입니다!',
    recastSentence: 'Minho waited for the bus for an hour yesterday.'
  },
  {
    id: 'ed-req-7',
    category: 'past_ed',
    subject: 'My sister',
    sentenceBefore: 'My sister',
    sentenceAfter: 'to the radio this morning.',
    koreanHint: '내 여동생은 오늘 아침 라디오를 들었어요.',
    timeHint: 'this morning (지나간 오늘 아침)',
    correctVerb: 'listened',
    options: ['listened', 'listens', 'listen'],
    ruleExplanation: '지나간 아침(this morning)의 일이므로 listen에 -ed를 붙여 "listened"!',
    recastSentence: 'My sister listened to the radio this morning.'
  },
  {
    id: 'ed-req-8',
    category: 'past_ed',
    subject: 'The chef',
    sentenceBefore: 'The chef',
    sentenceAfter: 'spaghetti for dinner yesterday.',
    koreanHint: '요리사는 어제 저녁으로 스파게티를 요리했어요.',
    timeHint: 'yesterday (어제)',
    correctVerb: 'cooked',
    options: ['cooked', 'cooks', 'cook'],
    ruleExplanation: '어제(yesterday) 한 요리이므로 cook에 -ed를 붙인 "cooked"가 정답!',
    recastSentence: 'The chef cooked spaghetti for dinner yesterday.'
  },
  {
    id: 'ed-req-9',
    category: 'past_ed',
    subject: 'The puppy',
    sentenceBefore: 'The puppy',
    sentenceAfter: 'loudly at the mailman this morning.',
    koreanHint: '그 강아지는 오늘 아침 우체부 아저씨를 보고 크게 짖었어요.',
    timeHint: 'this morning (지나간 아침)',
    correctVerb: 'barked',
    options: ['barked', 'barks', 'bark'],
    ruleExplanation: '지나간 일(this morning)이므로 bark 뒤에 -ed를 붙여 "barked"가 됩니다!',
    recastSentence: 'The puppy barked loudly at the mailman this morning.'
  },
  {
    id: 'ed-req-10',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'our teacher move the heavy desk.',
    koreanHint: '우리는 선생님이 무거운 책상을 옮기는 것을 도와드렸어요.',
    timeHint: 'yesterday (어제)',
    correctVerb: 'helped',
    options: ['helped', 'help', 'helps'],
    ruleExplanation: '과거 행동이므로 help 뒤에 -ed를 붙여 "helped"가 맞습니다!',
    recastSentence: 'We helped our teacher move the heavy desk.'
  },
  {
    id: 'ed-req-11',
    category: 'past_ed',
    subject: 'He',
    sentenceBefore: 'He',
    sentenceAfter: 'his bicycle yesterday afternoon.',
    koreanHint: '그는 어제 오후에 자전거를 닦았어요.',
    timeHint: 'yesterday afternoon (어제 오후)',
    correctVerb: 'washed',
    options: ['washed', 'washes', 'wash'],
    ruleExplanation: '어제 오후(yesterday afternoon)는 과거이므로 wash에 -ed를 붙여 "washed"!',
    recastSentence: 'He washed his bicycle yesterday afternoon.'
  },
  {
    id: 'ed-req-12',
    category: 'past_ed',
    subject: 'The red car',
    sentenceBefore: 'The red car',
    sentenceAfter: 'suddenly in front of the cat.',
    koreanHint: '빨간 차가 고양이 앞에서 갑자기 멈췄어요.',
    timeHint: 'suddenly (과거 한 시점) / 단모음+단자음',
    correctVerb: 'stopped',
    options: ['stopped', 'stoped', 'stops'],
    ruleExplanation: 'stop은 단모음+단자음으로 끝나므로 p를 한 번 더 쓰고 -ed를 붙여 "stopped"!',
    recastSentence: 'The red car stopped suddenly in front of the cat.'
  },
  {
    id: 'ed-req-13',
    category: 'past_ed',
    subject: 'Jenny',
    sentenceBefore: 'Jenny',
    sentenceAfter: 'math for two hours last night.',
    koreanHint: '제니는 어젯밤 두 시간 동안 수학을 공부했어요.',
    timeHint: 'last night / study 과거형',
    correctVerb: 'studied',
    options: ['studied', 'studyed', 'studies'],
    ruleExplanation: '과거(last night)이고 study는 자음+y이므로 y를 i로 고치고 -ed를 붙여 "studied"!',
    recastSentence: 'Jenny studied math for two hours last night.'
  },
  {
    id: 'ed-req-14',
    category: 'past_ed',
    subject: 'The baby',
    sentenceBefore: 'The baby',
    sentenceAfter: 'a lot on the plane yesterday.',
    koreanHint: '아기는 어제 비행기에서 많이 울었어요.',
    timeHint: 'yesterday / cry 과거형',
    correctVerb: 'cried',
    options: ['cried', 'cryed', 'cries'],
    ruleExplanation: '과거(yesterday)이고 cry는 자음+y로 끝나므로 y를 i로 바꾸고 -ed를 붙여 "cried"!',
    recastSentence: 'The baby cried a lot on the plane yesterday.'
  },
  {
    id: 'ed-req-15',
    category: 'past_ed',
    subject: 'Mom',
    sentenceBefore: 'Mom',
    sentenceAfter: 'sweet apple pies last weekend.',
    koreanHint: '엄마는 지난 주말에 달콤한 사과 파이를 구우셨어요.',
    timeHint: 'last weekend (지난 주말) / e로 끝남',
    correctVerb: 'baked',
    options: ['baked', 'bakes', 'bake'],
    ruleExplanation: 'bake처럼 e로 끝나는 동사는 -d만 붙여서 과거형 "baked"를 만듭니다!',
    recastSentence: 'Mom baked sweet apple pies last weekend.'
  },
  {
    id: 'ed-req-16',
    category: 'past_ed',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'a new video game last month.',
    koreanHint: '나는 지난달에 새 비디오 게임을 원했어요.',
    timeHint: 'last month (지난달 - 과거)',
    correctVerb: 'wanted',
    options: ['wanted', 'wants', 'want'],
    ruleExplanation: '지난달(last month)의 일이므로 want에 -ed를 붙여 "wanted"가 정답입니다!',
    recastSentence: 'I wanted a new video game last month.'
  },
  {
    id: 'ed-req-17',
    category: 'past_ed',
    subject: 'The children',
    sentenceBefore: 'The children',
    sentenceAfter: 'at the funny clown yesterday.',
    koreanHint: '아이들은 어제 우스꽝스러운 광대를 보고 웃었어요.',
    timeHint: 'yesterday (어제 - 과거)',
    correctVerb: 'laughed',
    options: ['laughed', 'laughs', 'laugh'],
    ruleExplanation: '어제(yesterday) 웃었던 일이므로 laugh 뒤에 -ed를 붙여 "laughed"!',
    recastSentence: 'The children laughed at the funny clown yesterday.'
  },
  {
    id: 'ed-req-18',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'the teacher a great question yesterday.',
    koreanHint: '우리는 어제 선생님께 멋진 질문을 드렸어요.',
    timeHint: 'yesterday (어제 - 과거)',
    correctVerb: 'asked',
    options: ['asked', 'asks', 'ask'],
    ruleExplanation: '어제(yesterday) 있었던 일이므로 ask 뒤에 -ed를 붙여 "asked"가 정답!',
    recastSentence: 'We asked the teacher a great question yesterday.'
  },
  {
    id: 'ed-req-19',
    category: 'past_ed',
    subject: 'He',
    sentenceBefore: 'He',
    sentenceAfter: 'the heavy box yesterday.',
    koreanHint: '그는 어제 무거운 상자를 옮겼어요.',
    timeHint: 'yesterday / carry 과거형',
    correctVerb: 'carried',
    options: ['carried', 'carrys', 'carry'],
    ruleExplanation: '과거(yesterday) 시점이고 carry는 자음+y이므로 y를 i로 고치고 -ed를 붙인 "carried"!',
    recastSentence: 'He carried the heavy box yesterday.'
  },
  {
    id: 'ed-req-20',
    category: 'past_ed',
    subject: 'The boy',
    sentenceBefore: 'The boy',
    sentenceAfter: 'over the stone five minutes ago.',
    koreanHint: '그 소년은 5분 전에 돌부리를 펄쩍 뛰어넘었어요.',
    timeHint: 'five minutes ago (5분 전 - 과거)',
    correctVerb: 'jumped',
    options: ['jumped', 'jumps', 'jump'],
    ruleExplanation: '5분 전(ago)은 이미 지난 과거이므로 jump 뒤에 -ed를 붙인 "jumped"가 맞습니다!',
    recastSentence: 'The boy jumped over the stone five minutes ago.'
  },
  {
    id: 'ed-req-21',
    category: 'past_ed',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'the front door tightly last night.',
    koreanHint: '그들은 어젯밤에 앞문을 꽉 닫았어요.',
    timeHint: 'last night (어젯밤) / close 과거형',
    correctVerb: 'closed',
    options: ['closed', 'closes', 'close'],
    ruleExplanation: 'e로 끝나는 close는 -d만 붙여서 과거형 "closed"를 만듭니다!',
    recastSentence: 'They closed the front door tightly last night.'
  },
  {
    id: 'ed-req-22',
    category: 'past_ed',
    subject: 'My brother',
    sentenceBefore: 'My brother',
    sentenceAfter: 'his hair five minutes ago.',
    koreanHint: '남동생은 5분 전에 머리를 빗었어요.',
    timeHint: 'five minutes ago (5분 전 - 과거)',
    correctVerb: 'brushed',
    options: ['brushed', 'brushes', 'brush'],
    ruleExplanation: '5분 전(ago)의 과거 일이므로 brush 뒤에 -ed를 붙여 "brushed"!',
    recastSentence: 'My brother brushed his hair five minutes ago.'
  },
  {
    id: 'ed-req-23',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'delicious cookies with friends yesterday.',
    koreanHint: '우리는 어제 친구들과 맛있는 쿠키를 나누어 먹었어요.',
    timeHint: 'yesterday (어제) / share 과거형',
    correctVerb: 'shared',
    options: ['shared', 'shares', 'share'],
    ruleExplanation: 'e로 끝나는 share의 과거형은 -d만 붙여서 "shared"가 됩니다!',
    recastSentence: 'We shared delicious cookies with friends yesterday.'
  },
  {
    id: 'ed-req-24',
    category: 'past_ed',
    subject: 'The plane',
    sentenceBefore: 'The plane',
    sentenceAfter: 'safely ten minutes ago.',
    koreanHint: '비행기는 10분 전에 안전하게 착륙했어요.',
    timeHint: 'ten minutes ago (10분 전 - 과거)',
    correctVerb: 'landed',
    options: ['landed', 'lands', 'land'],
    ruleExplanation: '10분 전(ago)은 과거이므로 land 뒤에 -ed를 붙여 "landed"!',
    recastSentence: 'The plane landed safely ten minutes ago.'
  },
  {
    id: 'ed-req-25',
    category: 'past_ed',
    subject: 'He',
    sentenceBefore: 'He',
    sentenceAfter: 'the door to let his dog in yesterday.',
    koreanHint: '그는 어제 강아지를 들어오게 하려고 문을 열어줬어요.',
    timeHint: 'yesterday (어제 - 과거)',
    correctVerb: 'opened',
    options: ['opened', 'opens', 'open'],
    ruleExplanation: '어제(yesterday) 일어난 일이므로 open 뒤에 -ed를 붙여 "opened"가 맞습니다!',
    recastSentence: 'He opened the door to let his dog in yesterday.'
  },
  {
    id: 'ed-req-26',
    category: 'past_ed',
    subject: 'She',
    sentenceBefore: 'She',
    sentenceAfter: 'her mom on the phone last night.',
    koreanHint: '그녀는 어젯밤에 엄마와 전화 통화를 했어요.',
    timeHint: 'last night (어젯밤 - 과거)',
    correctVerb: 'called',
    options: ['called', 'calls', 'call'],
    ruleExplanation: '어젯밤(last night)의 과거 일이므로 call에 -ed를 붙여 "called"!',
    recastSentence: 'She called her mom on the phone last night.'
  },
  {
    id: 'ed-req-27',
    category: 'past_ed',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'a beautiful bird in the tree yesterday.',
    koreanHint: '그들은 어제 나무 위에서 아름다운 새를 발견했어요.',
    timeHint: 'yesterday / spot 과거형 (단모음+단자음)',
    correctVerb: 'spotted',
    options: ['spotted', 'spoted', 'spots'],
    ruleExplanation: 'spot은 단모음+단자음이므로 t를 한 번 더 쓰고 -ed를 붙여 "spotted"!',
    recastSentence: 'They spotted a beautiful bird in the tree yesterday.'
  },
  {
    id: 'ed-req-28',
    category: 'past_ed',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'the broken toy yesterday morning.',
    koreanHint: '나는 어제 아침에 부서진 장난감을 고쳤어요.',
    timeHint: 'yesterday morning (어제 아침)',
    correctVerb: 'fixed',
    options: ['fixed', 'fixes', 'fix'],
    ruleExplanation: '어제 아침(과거)에 고쳤으므로 fix 뒤에 -ed를 붙여 "fixed"!',
    recastSentence: 'I fixed the broken toy yesterday morning.'
  },
  {
    id: 'ed-req-29',
    category: 'past_ed',
    subject: 'The artist',
    sentenceBefore: 'The artist',
    sentenceAfter: 'a huge picture on the wall last week.',
    koreanHint: '그 예술가는 지난주에 벽에 커다란 그림을 그렸어요.',
    timeHint: 'last week (지난주 - 과거)',
    correctVerb: 'painted',
    options: ['painted', 'paints', 'paint'],
    ruleExplanation: '지난주(last week)는 과거이므로 paint에 -ed를 붙여 "painted"가 맞습니다!',
    recastSentence: 'The artist painted a huge picture on the wall last week.'
  },
  {
    id: 'ed-req-30',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'our hands after the magic show yesterday.',
    koreanHint: '우리는 어제 마술 쇼가 끝난 후 손뼉을 쳤어요.',
    timeHint: 'yesterday / clap 과거형 (단모음+단자음)',
    correctVerb: 'clapped',
    options: ['clapped', 'claped', 'claps'],
    ruleExplanation: 'clap은 단모음+단자음이므로 p를 겹쳐 쓰고 -ed를 붙여 "clapped"!',
    recastSentence: 'We clapped our hands after the magic show yesterday.'
  },

  // --- SUBGROUP B: Requires PRESENT / BASE FORM (NO -ed) (30 questions) ---
  // Time hints: every day, every Sunday, always, usually, right now, on weekends.
  // Students must read the sentence and NOT pick -ed when it's present habit!
  {
    id: 'ed-base-1',
    category: 'past_ed',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'soccer with my friends every afternoon.',
    koreanHint: '나는 매일 오후 친구들과 축구를 해요.',
    timeHint: 'every afternoon (매일 오후 - 현재 습관은 -ed 금지!)',
    correctVerb: 'play',
    options: ['play', 'played', 'plays'],
    ruleExplanation: '매일 오후(every afternoon) 반복되는 일상이므로 과거형(-ed)이 아니라 현재형 "play"를 써야 해요!',
    recastSentence: 'I play soccer with my friends every afternoon.'
  },
  {
    id: 'ed-base-2',
    category: 'past_ed',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'their classroom every Friday.',
    koreanHint: '그들은 매주 금요일마다 교실을 청소해요.',
    timeHint: 'every Friday (매주 금요일 - 규칙적인 일상)',
    correctVerb: 'clean',
    options: ['clean', 'cleaned', 'cleans'],
    ruleExplanation: '매주 금요일(every Friday) 반복하는 습관이므로 -ed가 아니라 현재 기본형 "clean"이 맞습니다!',
    recastSentence: 'They clean their classroom every Friday.'
  },
  {
    id: 'ed-base-3',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'to school on foot every morning.',
    koreanHint: '우리는 매일 아침 걸어서 등교해요.',
    timeHint: 'every morning (매일 아침)',
    correctVerb: 'walk',
    options: ['walk', 'walked', 'walks'],
    ruleExplanation: '매일 아침(every morning) 하는 일이므로 과거형(-ed)을 쓰지 않고 현재형 "walk"!',
    recastSentence: 'We walk to school on foot every morning.'
  },
  {
    id: 'ed-base-4',
    category: 'past_ed',
    subject: 'You',
    sentenceBefore: 'You',
    sentenceAfter: 'cartoons every Sunday morning.',
    koreanHint: '너는 일요일 아침마다 만화를 보는구나.',
    timeHint: 'every Sunday (일요일마다)',
    correctVerb: 'watch',
    options: ['watch', 'watched', 'watches'],
    ruleExplanation: '일요일마다 반복되는 일상이므로 -ed를 붙이지 않고 "watch"를 씁니다!',
    recastSentence: 'You watch cartoons every Sunday morning.'
  },
  {
    id: 'ed-base-5',
    category: 'past_ed',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'my grandparents every vacation.',
    koreanHint: '나는 방학마다 조부모님 댁을 방문해요.',
    timeHint: 'every vacation (방학마다)',
    correctVerb: 'visit',
    options: ['visit', 'visited', 'visits'],
    ruleExplanation: '방학마다 반복되는 일이므로 과거형(-ed)이 아닌 현재형 "visit"가 맞아요!',
    recastSentence: 'I visit my grandparents every vacation.'
  },
  {
    id: 'ed-base-6',
    category: 'past_ed',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'for the yellow school bus every day.',
    koreanHint: '그들은 매일 노란 스쿨버스를 기다려요.',
    timeHint: 'every day (매일)',
    correctVerb: 'wait',
    options: ['wait', 'waited', 'waits'],
    ruleExplanation: '매일(every day) 일어나는 현재 사실이므로 -ed를 쓰지 않고 "wait"가 정답입니다!',
    recastSentence: 'They wait for the yellow school bus every day.'
  },
  {
    id: 'ed-base-7',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'to happy music together every day.',
    koreanHint: '우리는 매일 함께 신나는 음악을 들어요.',
    timeHint: 'every day (매일)',
    correctVerb: 'listen',
    options: ['listen', 'listened', 'listens'],
    ruleExplanation: '매일(every day) 반복되는 일이므로 과거형(-ed)이 아니라 "listen"이 맞습니다!',
    recastSentence: 'We listen to happy music together every day.'
  },
  {
    id: 'ed-base-8',
    category: 'past_ed',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'delicious ramen on Saturdays.',
    koreanHint: '나는 토요일마다 맛있는 라면을 끓여요.',
    timeHint: 'on Saturdays (토요일마다)',
    correctVerb: 'cook',
    options: ['cook', 'cooked', 'cooks'],
    ruleExplanation: '토요일마다(on Saturdays) 반복되는 습관이므로 과거형(-ed)이 아니라 "cook"!',
    recastSentence: 'I cook delicious ramen on Saturdays.'
  },
  {
    id: 'ed-base-9',
    category: 'past_ed',
    subject: 'Dogs',
    sentenceBefore: 'Dogs',
    sentenceAfter: 'when they see strangers.',
    koreanHint: '개들은 낯선 사람을 보면 짖어요.',
    timeHint: '일반적인 사실 (현재)',
    correctVerb: 'bark',
    options: ['bark', 'barked', 'barks'],
    ruleExplanation: '개들의 일반적인 습성이므로 과거형(-ed)이 아닌 현재형 "bark"를 써야 합니다!',
    recastSentence: 'Dogs bark when they see strangers.'
  },
  {
    id: 'ed-base-10',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'our parents clean the living room every weekend.',
    koreanHint: '우리는 주말마다 부모님의 거실 청소를 도와드려요.',
    timeHint: 'every weekend (주말마다)',
    correctVerb: 'help',
    options: ['help', 'helped', 'helps'],
    ruleExplanation: '주말마다(every weekend) 반복되는 일이므로 -ed를 붙이지 않고 "help"가 정답!',
    recastSentence: 'We help our parents clean the living room every weekend.'
  },
  {
    id: 'ed-base-11',
    category: 'past_ed',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'their hands before every meal.',
    koreanHint: '그들은 식사할 때마다 손을 씻어요.',
    timeHint: 'before every meal (식사할 때마다)',
    correctVerb: 'wash',
    options: ['wash', 'washed', 'washes'],
    ruleExplanation: '매 식사 전(before every meal) 하는 습관이므로 과거형(-ed)이 아니라 "wash"!',
    recastSentence: 'They wash their hands before every meal.'
  },
  {
    id: 'ed-base-12',
    category: 'past_ed',
    subject: 'Drivers',
    sentenceBefore: 'Drivers',
    sentenceAfter: 'at the red light every time.',
    koreanHint: '운전자들은 매번 빨간불에 멈춰요.',
    timeHint: 'every time (매번 - 일반 규칙)',
    correctVerb: 'stop',
    options: ['stop', 'stopped', 'stops'],
    ruleExplanation: '교통 신호 규칙(일반 사실)이므로 과거형(-ed)이 아니라 현재형 "stop"이 맞아요!',
    recastSentence: 'Drivers stop at the red light every time.'
  },
  {
    id: 'ed-base-13',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'English words together every day.',
    koreanHint: '우리는 매일 함께 영어 단어를 공부해요.',
    timeHint: 'every day (매일)',
    correctVerb: 'study',
    options: ['study', 'studied', 'studies'],
    ruleExplanation: '매일(every day) 하는 일이므로 과거형 studied가 아닌 현재형 "study"가 정답입니다!',
    recastSentence: 'We study English words together every day.'
  },
  {
    id: 'ed-base-14',
    category: 'past_ed',
    subject: 'Babies',
    sentenceBefore: 'Babies',
    sentenceAfter: 'when they feel sleepy.',
    koreanHint: '아기들은 졸릴 때 울어요.',
    timeHint: '일반적인 사실 (현재 습관)',
    correctVerb: 'cry',
    options: ['cry', 'cried', 'cries'],
    ruleExplanation: '일반적인 사실이므로 과거형 cried가 아니라 현재형 "cry"를 씁니다!',
    recastSentence: 'Babies cry when they feel sleepy.'
  },
  {
    id: 'ed-base-15',
    category: 'past_ed',
    subject: 'Bakers',
    sentenceBefore: 'Bakers',
    sentenceAfter: 'fresh bread early every morning.',
    koreanHint: '제빵사들은 매일 아침 일찍 신선한 빵을 구워요.',
    timeHint: 'every morning (매일 아침)',
    correctVerb: 'bake',
    options: ['bake', 'baked', 'bakes'],
    ruleExplanation: '매일 아침(every morning) 반복되는 일이므로 -ed가 아니라 "bake"가 정답!',
    recastSentence: 'Bakers bake fresh bread early every morning.'
  },
  {
    id: 'ed-base-16',
    category: 'past_ed',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'some sweet ice cream now.',
    koreanHint: '나는 지금 달콤한 아이스크림을 원해요.',
    timeHint: 'now (지금 - 현재)',
    correctVerb: 'want',
    options: ['want', 'wanted', 'wants'],
    ruleExplanation: '지금(now) 원하는 상태이므로 과거형 wanted가 아니라 현재형 "want"!',
    recastSentence: 'I want some sweet ice cream now.'
  },
  {
    id: 'ed-base-17',
    category: 'past_ed',
    subject: 'You and I',
    sentenceBefore: 'You and I',
    sentenceAfter: 'at funny stories every time.',
    koreanHint: '너와 나는 재미있는 이야기를 들을 때마다 웃어.',
    timeHint: 'every time (언제나, 매번)',
    correctVerb: 'laugh',
    options: ['laugh', 'laughed', 'laughs'],
    ruleExplanation: '매번 일어나는 일이므로 과거형(-ed)이 아니라 기본형 "laugh"가 맞아요!',
    recastSentence: 'You and I laugh at funny stories every time.'
  },
  {
    id: 'ed-base-18',
    category: 'past_ed',
    subject: 'Students',
    sentenceBefore: 'Students',
    sentenceAfter: 'questions in class every day.',
    koreanHint: '학생들은 매일 수업 시간에 질문을 해요.',
    timeHint: 'every day (매일)',
    correctVerb: 'ask',
    options: ['ask', 'asked', 'asks'],
    ruleExplanation: '매일(every day) 하는 행동이므로 과거형 asked가 아니라 현재형 "ask"!',
    recastSentence: 'Students ask questions in class every day.'
  },
  {
    id: 'ed-base-19',
    category: 'past_ed',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'my backpack to school every morning.',
    koreanHint: '나는 매일 아침 책가방을 학교에 메고 가요.',
    timeHint: 'every morning (매일 아침)',
    correctVerb: 'carry',
    options: ['carry', 'carried', 'carries'],
    ruleExplanation: '매일 아침(every morning) 하는 일이므로 과거형이 아닌 현재형 "carry"가 정답!',
    recastSentence: 'I carry my backpack to school every morning.'
  },
  {
    id: 'ed-base-20',
    category: 'past_ed',
    subject: 'Frogs',
    sentenceBefore: 'Frogs',
    sentenceAfter: 'high into the pond.',
    koreanHint: '개구리들은 연못으로 높이 뛰어들어요.',
    timeHint: '일반적인 생태 사실',
    correctVerb: 'jump',
    options: ['jump', 'jumped', 'jumps'],
    ruleExplanation: '일반적인 자연 사실이므로 과거형 jumped가 아니라 현재형 "jump"가 맞습니다!',
    recastSentence: 'Frogs jump high into the pond.'
  },
  {
    id: 'ed-base-21',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'the windows when it rains.',
    koreanHint: '우리는 비가 올 때 창문을 닫아요.',
    timeHint: 'when it rains (비가 올 때마다)',
    correctVerb: 'close',
    options: ['close', 'closed', 'closes'],
    ruleExplanation: '비가 올 때마다 하는 습관이므로 과거형 closed가 아니라 현재형 "close"!',
    recastSentence: 'We close the windows when it rains.'
  },
  {
    id: 'ed-base-22',
    category: 'past_ed',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'their teeth twice every day.',
    koreanHint: '그들은 매일 두 번씩 양치질을 해요.',
    timeHint: 'every day (매일)',
    correctVerb: 'brush',
    options: ['brush', 'brushed', 'brushes'],
    ruleExplanation: '매일(every day) 닦는 습관이므로 과거형(-ed)이 아니라 "brush"가 맞아요!',
    recastSentence: 'They brush their teeth twice every day.'
  },
  {
    id: 'ed-base-23',
    category: 'past_ed',
    subject: 'Good friends',
    sentenceBefore: 'Good friends',
    sentenceAfter: 'their snacks every time.',
    koreanHint: '좋은 친구들은 언제나 간식을 서로 나눠요.',
    timeHint: 'every time (언제나, 매번)',
    correctVerb: 'share',
    options: ['share', 'shared', 'shares'],
    ruleExplanation: '언제나 하는 행동이므로 과거형 shared가 아닌 기본형 "share"가 정답입니다!',
    recastSentence: 'Good friends share their snacks every time.'
  },
  {
    id: 'ed-base-24',
    category: 'past_ed',
    subject: 'Birds',
    sentenceBefore: 'Birds',
    sentenceAfter: 'safely on tree branches.',
    koreanHint: '새들은 나뭇가지 위에 안전하게 앉아요.',
    timeHint: '자연스러운 일반 사실',
    correctVerb: 'land',
    options: ['land', 'landed', 'lands'],
    ruleExplanation: '일반적인 자연 현상이므로 과거형 landed가 아니라 현재형 "land"!',
    recastSentence: 'Birds land safely on tree branches.'
  },
  {
    id: 'ed-base-25',
    category: 'past_ed',
    subject: 'Stores',
    sentenceBefore: 'Stores',
    sentenceAfter: 'at nine o’clock every morning.',
    koreanHint: '가게들은 매일 아침 9시에 문을 열어요.',
    timeHint: 'every morning (매일 아침)',
    correctVerb: 'open',
    options: ['open', 'opened', 'opens'],
    ruleExplanation: '매일 아침(every morning) 반복되는 운영 시간이므로 과거형이 아닌 "open"!',
    recastSentence: 'Stores open at nine o’clock every morning.'
  },
  {
    id: 'ed-base-26',
    category: 'past_ed',
    subject: 'I',
    sentenceBefore: 'I',
    sentenceAfter: 'my grandmother every weekend.',
    koreanHint: '나는 주말마다 할머니께 전화를 드려요.',
    timeHint: 'every weekend (주말마다)',
    correctVerb: 'call',
    options: ['call', 'called', 'calls'],
    ruleExplanation: '주말마다(every weekend) 드리는 전화이므로 과거형 called가 아니라 "call"!',
    recastSentence: 'I call my grandmother every weekend.'
  },
  {
    id: 'ed-base-27',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'wild rabbits in the hills often.',
    koreanHint: '우리는 종종 언덕에서 산토끼를 발견해요.',
    timeHint: 'often (종종, 자주 - 현재 빈도)',
    correctVerb: 'spot',
    options: ['spot', 'spotted', 'spots'],
    ruleExplanation: '자주(often) 있는 일이므로 과거형 spotted가 아니라 현재형 "spot"!',
    recastSentence: 'We spot wild rabbits in the hills often.'
  },
  {
    id: 'ed-base-28',
    category: 'past_ed',
    subject: 'They',
    sentenceBefore: 'They',
    sentenceAfter: 'broken chairs on Saturdays.',
    koreanHint: '그들은 토요일마다 부서진 의자를 고쳐요.',
    timeHint: 'on Saturdays (토요일마다)',
    correctVerb: 'fix',
    options: ['fix', 'fixed', 'fixes'],
    ruleExplanation: '토요일마다(on Saturdays) 하는 활동이므로 과거형 fixed가 아니라 "fix"!',
    recastSentence: 'They fix broken chairs on Saturdays.'
  },
  {
    id: 'ed-base-29',
    category: 'past_ed',
    subject: 'Students',
    sentenceBefore: 'Students',
    sentenceAfter: 'colorful pictures in art class.',
    koreanHint: '학생들은 미술 시간에 다채로운 그림을 그려요.',
    timeHint: 'in art class (미술 시간마다)',
    correctVerb: 'paint',
    options: ['paint', 'painted', 'paints'],
    ruleExplanation: '일반적인 수업 활동이므로 과거형 painted가 아니라 현재형 "paint"가 맞습니다!',
    recastSentence: 'Students paint colorful pictures in art class.'
  },
  {
    id: 'ed-base-30',
    category: 'past_ed',
    subject: 'We',
    sentenceBefore: 'We',
    sentenceAfter: 'happily when our team scores.',
    koreanHint: '우리는 우리 팀이 골을 넣을 때 기쁘게 손뼉을 쳐요.',
    timeHint: 'when our team scores (골을 넣을 때마다)',
    correctVerb: 'clap',
    options: ['clap', 'clapped', 'claps'],
    ruleExplanation: '골을 넣을 때마다 하는 반응이므로 과거형 clapped가 아니라 "clap"!',
    recastSentence: 'We clap happily when our team scores.'
  }
];

// TOTAL QUESTIONS IN POOL: 60 (Third Person -s) + 60 (Past Tense -ed) = 120 Questions!
export const TOTAL_QUESTION_POOL_SIZE = THIRD_PERSON_QUESTIONS.length + PAST_ED_QUESTIONS.length;

/**
 * Generates a quiz session with balanced distribution and completely randomized selection
 * from the 120+ sentence pool.
 */
export function generateQuizSession(mode: GameMode, count = 10): Question[] {
  let pool: Question[] = [];

  if (mode === 'third_person_s') {
    // Balance between questions requiring -s (e.g. He, She, Dog) and base form (e.g. I, They, We)
    const requiredHalf = Math.floor(count / 2);
    const baseHalf = count - requiredHalf;

    const reqQuestions = THIRD_PERSON_QUESTIONS.filter(q => q.id.startsWith('s-req-'));
    const baseQuestions = THIRD_PERSON_QUESTIONS.filter(q => q.id.startsWith('s-base-'));

    const sampledReq = shuffle(reqQuestions).slice(0, requiredHalf);
    const sampledBase = shuffle(baseQuestions).slice(0, baseHalf);

    pool = shuffle([...sampledReq, ...sampledBase]);
  } else if (mode === 'past_ed') {
    // Balance between past tense (-ed) and present habit (base form)
    const requiredHalf = Math.floor(count / 2);
    const baseHalf = count - requiredHalf;

    const reqQuestions = PAST_ED_QUESTIONS.filter(q => q.id.startsWith('ed-req-'));
    const baseQuestions = PAST_ED_QUESTIONS.filter(q => q.id.startsWith('ed-base-'));

    const sampledReq = shuffle(reqQuestions).slice(0, requiredHalf);
    const sampledBase = shuffle(baseQuestions).slice(0, baseHalf);

    pool = shuffle([...sampledReq, ...sampledBase]);
  } else {
    // Mixed Mode: 5 from 3rd person -s pool, 5 from past -ed pool
    const halfCount = Math.floor(count / 2);
    const sPool = generateQuizSession('third_person_s', halfCount);
    const edPool = generateQuizSession('past_ed', count - halfCount);
    pool = shuffle([...sPool, ...edPool]);
  }

  // Randomize option positions for every question so correct answer isn't predictable
  return pool.map(q => ({
    ...q,
    options: shuffle(q.options)
  }));
}
