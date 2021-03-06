## 타입(Type)이란?

프로그래밍은 수학의 학문입니다. 하지만 숫자만 쓰진 않아요.

**가령 게임에서 캐릭터를 생성할 때, 캐릭터 이름을 입력받습니다.**  
이 캐릭터 이름은 사용자가 입력한 값을 담아두는 변수이지만 숫자가 아닙니다. 글자죠.

이 외에도 `참/거짓` 또한 사용합니다.  
이런 것들을 우리는 **타입(Type)**, 또는 **자료형**이라고 부릅니다.

본 강좌에서는 타입이라고 호칭하겠습니다.  
에리엔진에서 사용하는 변수의 타입은 크게 아래와 같습니다.

## 타입의 종류

### string

문자열입니다. 글자라고도 말합니다.  
*a, b, c, e, 가, 나, 다, 라, 안녕하세요!* 같은 모든 문자를 **string** 타입이라고 합니다.

게임에서 캐릭터 이름을 입력받는 것도, 이 **string** 타입이에요.


### number

숫자에요.  
같은 숫자 타입의 덧셈, 뺄셈, 나누기, 곱하기같은 사칙연산과 수학적 알고리즘을 적용할 수 있습니다.

캐릭터의 `hp`, `mp`같은 체력이나 마나를 표현하는 변수로 쓸 수 있습니다.

### boolean

참/거짓이에요. 오직 `true`, `false` 둘 중 하나 밖에 사용할 수 없습니다.  
껐다/켰다하는 스위치를 생각하면 편하죠.

상태를 표현할 때 편해요.  
가령 부활 스킬은 죽은 캐릭터에게만 사용할 수 있잖아요.
*이 캐릭터가 죽은 상태이냐?*를 표현하고 싶다면, 이렇게 쓰는거죠.

```
isThisCharacterDead: boolean = true // 이 캐릭터는 죽어있는 상태입니다.
```

이 외에도 몇 가지 타입이 더 있습니다.  
하지만 에리엔진에서 주로 사용하는 타입은 크게 위 3가지이므로, 생략하겠습니다.

## 타입의 사용법

변수에 대해 배우셨나요?  
배우지 않았다면 [변수 문서](./what-is-variable)를 읽고 와주세요.

프로그래밍에서 타입은 변수에 붙여서 사용합니다.  
아래와 같은 구조를 띄고 있습니다.

```
const 변수명: 타입명 = 변수값
```

실제 예를 들어볼까요.  
캐릭터의 `hp`를 표현하는 변수는 이렇게 씁니다.

```
const hp: number = 100
```

이 코드는 `hp`라는 변수에 `100`이란 값을 넣는다는 의미입니다.  
하지만 아래와 같은 경우는 어떻게 될까요?

```
const hp: number = '안녕하세요'
```

이 경우는 에러가 발생합니다.

`안녕하세요`라는 건 문장이에요.  
`hp`의 타입은 **number**이므로 숫자만 입력할 수 있습니다.  
타입과 일치하지 않은 변수값이므로 에러가 발생합니다.

이렇듯, 타입은 변수에 담을 수 있는 값을 제한하는 용도입니다.  
이는 프로그래밍을 할 때 실수를 방지하는 용도로 큰 도움을 줍니다.

## 타입을 생략할 수 있나요?

할 수 있어요.

```
const hp = 100
```

이렇게 쓸 수 있습니다. 하지만 권장하지 않습니다.  
무조건 생략할 수 있는 것도 아니고, 언젠간 반드시 입력해야하는 경우가 생기거든요.  
또한 실수를 할 수도 있는 경우가 생깁니다.

일관성 있게 작성된 프로그래밍 코드는, 나중에 보기에도 읽기가 쉽습니다.  
좋은 버릇은 일찍 들이는게 좋겠지요?