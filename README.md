# Micro Measurable Client Website
<br>

## 1. 프로젝트 소개

- 한동대학교 전산전자공학부 2024-1 캡스톤 디자인2 프로젝트로 구현한 대기환경 모니터링 시스템, Micro Measurable 클라리언트 웹사이트입니다.
- 측정 대기 데이터를 누구나 자유롭게 열람할 수 있도록 하여, 대기질 현황을 쉽게 확인하고 활용할 수 있도록 하는 것을 목적으로 합니다.
- 측정 대기 물질은 온도, 습도, 풍향, 풍속, 미세먼지, 초미세먼지, 극초미세먼지, 포름알데히드입니다.

<br>

## 2. 팀원 구성

<div align="center">
    <img src="https://github.com/LeeShinwon/micro_measurable_admin/assets/82192923/4cad8f46-f0ab-4b80-b201-ae5295c43353" width=700>
</div>

<div align="center">
<h4> 소프트웨어 </h4>
    김예인, 이신원, 최은총, 한상화
<h4> 하드웨어 팀 </h4>
    이수현, 이찬영, 이찬휘, 유현도
</div>

<br>

## 3. 주요 기능

1. 지도보기
- 지도 상에서 설치된 노드들의 위치를 확인할 수 있습니다. 각 노드를 선택하면 해당 노드에 대한 대기질 정보를 볼 수 있습니다.
- 미세먼지 및 포름알데히드는 대기 유해물질로서 유해도에 따른 범례가 표시되고 색상을 통해 쉽게 파악할 수 있습니다.

2. 실시간 데이터 보기
- 실시간 데이터 보기의 경우에는 일별 측정값을 표와 그래프를 통해 확인할 수 있습니다.
- 측정물질, 측정단위(일평균 or 시간평균), 측정일시를 선택한 후, 검색버튼을 눌러 표 형식으로 해당 측정 값을 받아 열람할 수 있습니다.
- 실시간 데이터는 그래프 형식으로도 조회가능하며 전체적인 흐름을 파악하기에 용이합니다.
- 엑셀파일 다운로드 기능이 제공됩니다.

4. 통계보기
- 일별, 월별, 년도별 통계자료를 표와 그래프 형식 열람할 수 있습니다.
- 엑셀파일 다운로드 기능이 제공됩니다.

<br>

## 4. 시스템 구조
![](https://github.com/LeeShinwon/micro_measurable_admin/blob/main/structure.png)

<br>

## 5. 개발 환경

- Front : React, VITE, MUI
- Back-end : NODE.JS, FIREBASE
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Notion, Github, Google Drive
- 서비스 배포 환경 : AWS EC2
- 디자인 : [Figma](https://www.figma.com/design/aiXTcvZdEUs0Ji5YNyiMwH/%EC%BA%A1%EC%8A%A4%ED%86%A42-%EC%9B%B9?node-id=260%3A78&t=ZfmlI2ikT0HOWtn7-1)

<img src="https://github.com/LeeShinwon/micro_measurable_admin/blob/main/stack.png" alt="Example Image" width="500" height="180">
<br>
