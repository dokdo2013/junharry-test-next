# 해리배치고사

트위치 스트리머 [전해리](https://twitch.tv/gofl2237) 방송 1주년 기념 **해리배치고사** 웹사이트

## 주요 기능
- 트위치 로그인
- 테스트 응시와 결과 보기
- 주요 정책
  - 테스트 응시 전, 응시 후에는 테스트 페이지로 진입 불가
  - 테스트 응시 후에만 결과 페이지로 진입 가능
  - 응시 데이터를 기반으로 부정행위 여부 분석 가능
- 응시결과는 관리자페이지에서만 조회 가능


## 기술 스택
- FrontEnd
  - Next.js
  - Vercel Deploy
- BackEnd
  - FastAPI
  - Jenkins Deploy
  - AWS RDS (MariaDB)
  - AWS ElastiCache (Redis)
