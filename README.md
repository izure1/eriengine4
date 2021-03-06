# 에리엔진
에리엔진은 간단한 쿼터뷰 게임을 구현하도록 도와주는 게임 엔진입니다.  
[Phaser3](https://github.com/photonstorm/phaser) 라이브러리를 사용하여 HTML 캔버스로 구현됩니다.

공식 문서는 아래 링크를 참조해주세요.  
[https://eriengine.izure.org](https://eriengine.izure.org)

## 지원 프로그래밍 언어
* [타입스크립트](https://www.typescriptlang.org/) **(권장)**
* 자바스크립트

기본적으로 위 두 가지 언어를 사용하여 프로그래밍합니다.  
하지만 간단한 프로그래밍을 위한 기능도 지원합니다. 이를 **스크립트**라고 하며, 프로그래밍에 익숙하지 않은 사용자도 GUI의 형태로 프로그래밍할 수 있습니다. 추후 지원될 예정입니다.

## 지원 운영체제
에리엔진은 Windows10 x64 기반의 OS에서 동작합니다.  
빌드된 게임은 웹, 윈도우, 안드로이드 등 크로스플랫폼을 지원합니다.

## 설치
기본적으로 Windows10 버전의 프리빌트된 버전을 배포합니다. 이는 [릴리스 페이지](https://github.com/izure1/eriengine/releases)에서 확인할 수 있습니다.

만약 그 외의 운영체제에서 사용하고 싶다면 소스코드를 직접 빌드하는 방법이 있습니다.  
아래 가이드라인을 따르세요.

1. [Node.js](https://nodejs.org/ko/download/)를 설치합니다.
2. 본 저장소에서 [에리엔진 소스코드를 다운](https://github.com/izure1/eriengine/archive/master.zip)받습니다.
3. 다운받은 소스코드 디렉토리에서 `npm i` 명령어를 호출하여 의존모듈을 설치합니다.
4. 이후 `npm run electron:build` 명령어를 호출하여 엔진을 빌드합니다.

다만 에리엔진은 Windows10 환경에서 제작되었으며, 다른 운영체제의 정상적인 작동을 보장하지 않습니다.

## 라이센스
에리엔진은 **MIT 라이선스**를 따릅니다.  

다만 에리엔진을 이용하여 빌드된 게임의 라이선스를 의미하는 것은 아닙니다.  
게임의 라이선스는 엔진 배포자에게 따라 달라질 수 있으므로, 에리엔진 내부에서 확인하도록 하십시오.

## 기여자 목록
아래는 이 저장소를 도와주신 기여자 목록입니다.  
<img src="https://contributors-img.web.app/image?repo=izure1/eriengine">