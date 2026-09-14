# claude-skills

팀 공용 Claude Code 스킬 모음입니다. 각 폴더가 스킬 하나(`<스킬명>/SKILL.md`)입니다.

## 설치 (전역 — 모든 프로젝트에서 사용)

### Windows (PowerShell)

```powershell
git clone https://github.com/vediteur/claude-skills.git
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\skills" | Out-Null
Copy-Item -Recurse -Force .\claude-skills\mentor "$env:USERPROFILE\.claude\skills\mentor"
Copy-Item -Recurse -Force .\claude-skills\ux-writing "$env:USERPROFILE\.claude\skills\ux-writing"
```

### macOS / Linux

```bash
git clone https://github.com/vediteur/claude-skills.git
mkdir -p ~/.claude/skills && cp -R claude-skills/mentor ~/.claude/skills/mentor
cp -R claude-skills/ux-writing ~/.claude/skills/ux-writing
```

설치 후 Claude Code를 새로 열면 스킬이 자동 등록됩니다.
질문만 해도 자동 발동하고, `/mentor <질문>`, `/ux-writing <요청>`처럼 강제 발동할 수도 있습니다.

### 업데이트를 `git pull`만으로 받고 싶다면 (선택)

복사 대신 클론 위치를 링크로 연결해 두면 pull이 곧 업데이트가 됩니다.

```powershell
# Windows (junction — 관리자 권한 불필요, <클론경로>는 실제 경로로 교체)
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\mentor" -Target "<클론경로>\claude-skills\mentor"
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\ux-writing" -Target "<클론경로>\claude-skills\ux-writing"
```

```bash
# macOS / Linux
ln -s "$(pwd)/claude-skills/mentor" ~/.claude/skills/mentor
ln -s "$(pwd)/claude-skills/ux-writing" ~/.claude/skills/ux-writing
```

## 스킬 목록

| 스킬 | 설명 |
|---|---|
| `mentor` | PHP 배경 개발자에게 현재 프로젝트의 코드·아키텍처·수정 이력·새 스택 개념(Next.js/React/Spring/JPA/Flyway/JWT 등)을 "왜 → 수정 방향 → 방법론 선택 이유 → 어떻게 → QA 방법 → 운영 영향 → 주의사항" 골격으로 가르쳐주는 멘토 스킬. 이해·학습 질문에 자동 발동하며, 실제 코드·git 이력을 근거로만 답하도록 설계됨. |
| `ux-writing` | 한국어 서비스의 UX 라이팅 스킬. 버튼 라벨·팝업·에러 메시지·푸시/문자/카카오 알림·온보딩·빈 화면·토스트·랜딩 카피·SNS 후킹 카피를 "맥락 파악 → 문제 정의 → 가설 → 2~3안 → 컴포넌트 규칙 → 체크리스트 검증" 절차로 쓰거나 Before/After로 고쳐줌. 4대 가이드라인(간결·명확·모두를 위한 글쓰기·혜택 중심), 컴포넌트별 글자 수·구조 규칙, 토스/뉴닉/숨고/Material/HIG 가이드 요약을 `references/`에 담고 있음. |

각 스킬의 페르소나(대상 사용자) 정의는 SKILL.md 상단 "사용자가 누구인가" 섹션에 있습니다.
본인 상황과 다르면 그 섹션만 수정해서 쓰세요.
