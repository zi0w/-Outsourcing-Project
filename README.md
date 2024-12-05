# 🍴welcome to 이븐한맛집🍴

### 흑백요리사 맛집 리스트와 식당 위치 기반 지도 서비스를 지원하는 서비스 프로젝트
배포 링크: [https://outsourcing-project-dun.vercel.app/](https://outsourcing-project-dun.vercel.app/)

<br />

![Macbook Pro - Dark Background](https://github.com/user-attachments/assets/9f6fdcab-10ad-4137-b904-69d7027fb868)


<br/>

# 👨‍👩‍👧‍👦 Our Team 
| 최민석        |    우지영      |  김민후        |    김민지      |     최강건     |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [@Noonsae](https://github.com/Noonsae) | [@zi0w](https://github.com/zi0w) | [@minhoo](https://github.com/kminhoo)   |    [@minji7901](https://github.com/minji7901) | [@Choi-kanggun](https://github.com/Choi-kanggun)

<br/>

### [📝 프로젝트 노션 바로가기](https://teamsparta.notion.site/3cd2ed7e2a814b0c8c62ec000526c927)

<br/>

# 🕹️ 프로젝트 기능
### 1️⃣ Kakao map API
- Kakao map에서 제공하는 API를 이용하여 매장 주소를 좌표 값으로 변경(`Geocoder`)하여 지도 이동
- 매장 주소에 Marker & Custom Overlay 표시
  
### 2️⃣ Supabase를 활용한 CRUD
- 로그인, 회원 가입
  - Authentication에서 제공하는 api를 이용하여 로그인, 로그아웃, 회원 가입 구현
  - 소셜 로그인(google) 구현
  - 로그인, 회원 가입 실시간 유효성 검사 구현
  <br />
- 메인 페이지
  - 매장 정보, Storage 이미지를 활용하여 slick slide 구현
  <br />
- 검색 페이지
  - 매장 정보 기반 리스트, 지도 구현
  <br />
- 상세 페이지
  - 리뷰 추가, 수정, 삭제 기능 구현
  - 좋아요 추가, 삭제 기능 구현
  - 매장별 정보 카드, 지도 구현
  <br />
- 마이 페이지
  - 작성된 리뷰, 좋아요 데이터를 활용한 삭제 기능 구현
  - 닉네임, 프로필 사진 변경 기능 구현
  
### 3️⃣ Tanstack Query를 활용한 서버 상태 관리
- `useQuery`를 사용한 data fetching과 서버 상태 관리
- `useMutation`을 통한 **낙관적 업데이트** 및 수정 삭제 기능 구현

### 4️⃣ Zustand를 활용한 클라이언트 상태 관리
- `Zustand`를 사용한 유저 상태 전역 관리
- `persist`사용 -> 유저 정보를 로컬 스토리지에서 관리 -> 페이지 전환시 로그인 상태 유지
- `getState`를 사용한 상태 외부 접근 

### 5️⃣ RRD(React Router DOM)을 활용한 페이지 라우팅
- 페이지 라우팅 구현
- 로그인 된 유저가 접근할 수 있는 페이지와 아닌 페이지 구분(`GuestRoute`, `PrivateRoute`)
- `Layout`과 `Outlet`을 사용하여 일관된 UI 제공
  
### 6️⃣ Custom Hook을 이용한 비즈니스 로직과 UI 로직 분리

<br />

# 🎥 시연 영상
<details>
<summary>1. 게스트입장 예외처리, 회원가입, 로그인</summary>
<div markdown="1">
  
![게스트입장 예외처리, 회원가입,로그인](https://github.com/user-attachments/assets/910b26c1-8923-4d0c-9b18-5717804a60cd)


</div>
</details>
<details>
<summary>2. 디테일페이지 마크업, 좋아요, 댓글</summary>
<div markdown="1">
  
![디테일페이지 마크업, 좋아요, 댓글 crud](https://github.com/user-attachments/assets/84ced97f-1232-4258-b859-31f0627a0905)


</div>
</details>
<details>
<summary>3. 홈화면 식당 목록 슬라이드, 셀렉터</summary>
<div markdown="1">

![홈화면 식당 목록 슬라이드, 셀렉터](https://github.com/user-attachments/assets/40a3d703-e227-42cc-a00b-9eb69000bdcb)


</div>
</details>
<details>
<summary>4. 전체 지도 카테고리 분류, 마크업</summary>
<div markdown="1">

![전체지도 카테고리 분류, 마크업](https://github.com/user-attachments/assets/6367f653-6c49-4d06-9bbe-f8a50728610c)


</div>
</details>
<details>
<summary>5. 마이페이지 좋아요, 리뷰 불러오기, 삭제 프로필 이미지, 닉네임 변경</summary>
<div markdown="1">

![마이페이지 좋아요, 리뷰 불러오기,삭제 프로필 이미지,닉네임변경](https://github.com/user-attachments/assets/33ece2f2-beaa-41a2-b6dc-7253c06ed0ed)



</div>
</details>

<br />

<br />

# ⚙️ Development Environment ⚙️
`supabase/supabase-js: ^2.46.1` `react-router-dom: ^6.28.0` `@tanstack/react-query: ^5.61.5` `@tanstack/react-query-devtools: ^5.62.0` `zustand: ^5.0.1` `react-slick: ^0.30.2` `slick-carousel: ^1.8.1` `sweetalert2: ^11.14.5` `tailwindcss: ^3.4.15` `vite: ^6.0.1` `prettier: 3.4.1` `eslint/js: ^9.15.0`

<br />

# 🖥️ Technologies & Tools 🖥️
<div>
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=Supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=Slack&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/>
</div>

<br/>

# 🌳 프로젝트 구조
```bash
📦src
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┣ 📂features
 ┃ ┣ 📂layout
 ┃ ┣ 📂shared
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┗ 📂signup
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂detail
 ┃ ┣ 📂home
 ┃ ┣ 📂profile
 ┃ ┣ 📂search
 ┃ ┣ 📂signin
 ┃ ┗ 📂signup
 ┣ 📂store
 ┣ 📂supabase
 ┣ 📂utils
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜main.jsx
```
