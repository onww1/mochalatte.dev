---
template: post
slug: py-crawling-request
draft: false
socialImage: /emoji.png
title: Requests로 크롤링하기
date: 2019-04-08T05:34:43.424Z
description: Requests를 이용하여 웹 크롤링을 하는 것에 대한 글입니다.
category: Today I Learned
tags:
  - TIL
  - Programming
  - Python
  - Crawling
---

\
안녕하세요. **Mochalatte** 입니다.

지난 글에서 **Python**에 있는 `Selenium`과 `BeautifulSoup4`를 이용하여 [백준 온라인 저지](https://boj.kr/)를 크롤링하는 것에 대해서 다루었습니다. 사실 `selenium`은 브라우저를 이용하여 크롤링을 하기 때문에 **동적 페이지**에 대한 크롤링도 가능하다는 장점이 있지만 느리다는 단점도 있습니다. 그래서 동적 페이지가 아닌 **정적 페이지**인 경우에는 굳이 `selenium`을 쓸 필요가 없습니다. 그저 **API**를 통하여 **request**를 보내고, 그에 대한 **response**로 받은 html 파일을 `BeautifulSoup`로 파싱하면 됩니다. 그래서 오늘은 이에 대해서 간단히 다루어 보려고 합니다.

`BeautifulSoup`를 다루는 것은 동일하기 때문에 `Requests`를 이용하는 것을 중점적으로 다뤄보도록 하겠습니다.

---

## 크롤링 준비하기

`Requests`로 크롤링을 하기 위해서 필요한 것들은 다음과 같습니다.

```text
준비물 : bs4, requests
```

- 만약 `bs4`나 `requests`가 설치되어 있지 않으시다면, **터미널**(또는 **cmd**)에서 다음과 같은 커맨드를 실행하여 설치해주시면 됩니다.
  
  ```bash
  pip install bs4
  pip install requests

  # Linux, Mac 등에서 Python3를 사용하는 경우
  pip3 install bs4
  pip3 install requests
  ```

---

## 크롤링을 하기 전에

크롤링을 시작하기에 앞서 `쿠키(Cookie)`와 `세션(Session)`에 대해 알아야 할 필요가 있습니다. 이 두 가지가 필요한 근본적인 이유는 **각 요청에 대하여 사용자를 구별**하기 위함입니다. 대부분의 웹은 **HTTP**라는 프로토콜을 통해서 동작하게 됩니다. 그런데 **HTTP**의 특징은 서버와 클라이언트가 연결을 지속적으로 유지하지 않고, 클라이언트가 `요청(Request)`를 보낼 때마다 연결을 하여 `응답(Response)`을 하는 방식입니다. 그래서 매번 요청을 받을 때마다 이 요청이 이전에 요청을 했던 사용자와 같은지를 확인해야 합니다. 이럴 때 필요한 것이 `쿠키(Cookie)`와 `세션(Session)`입니다.

`쿠키`는 웹 사이트를 방문했을 때, 그 사이트로부터 브라우저에 할당되는 작은 `파일`이고, `Key - Value` 형식으로 로컬 브라우저에 저장됩니다. 이렇게 저장된 쿠키의 정보를 읽어서 HTTP 요청에 대해 브라우저를 식별하게 됩니다.

그런데 쿠키가 로컬 브라우저에 저장이 되기 때문에 사용자가 악의적으로 쿠키를 변조해서 비정상적인 쿠키로 서버에 요청을 보낼 수 있습니다. 그래서 단순히 이 사용자에 대해서 **로그인된 유저**라는 정보를 쿠키만으로 신뢰하게 된다면 다른 사람으로 위장할 수 있게 됩니다.

이러한 문제점으로 인하여 서버에서 클라이언트를 식별하는 `세션`을 주로 이용합니다.

`세션`은 브라우저가 서버에 요청을 한 경우, 서버에서 해당 세션 정보를 파일이나 DB에 저장하고, 클라이언트에게는 `session-id`라는 임의의 긴 문자열을 주게 됩니다. 이때 사용되는 쿠키는 서버간의 연결이 끊어진 경우 삭제되는 **메모리 쿠키**를 이용하게 됩니다.

> 위 내용은 https://beomi.github.io/2017/01/20/HowToMakeWebCrawler-With-Login/ 를 참고하였습니다.

---

## 백준 문제 리스트 크롤링하기

이제 `requests`에 있는 `Session`을 이용하여 세션을 만들고, `selenium`으로도 해보았던 백준 [전체 문제](https://www.acmicpc.net/problemset) 탭 크롤링을 해보도록 하겠습니다. 먼저 필요한 모듈들을 import하고, Session을 만듭니다.

```python
import requests
from bs4 import BeautifulSoup as bs

with requests.Session() as s:
  # Code
```

그런 다음 with 구문 안에서 Session의 `get` 함수를 이용하여 전체 문제 사이트를 불러옵니다. 그 리턴받은 객체의 `text` attribute가 html인데, 그 html을 `BeautifulSoup`에게 넘겨주어 파싱합니다. 이후 이전에 했던 것과 같이 **문제 번호**와 **제목**에 대한 `CSS Selector`를 `BeautifulSoup`에게 넘겨주어 데이터들을 가져온 뒤 출력합니다. 이에 대한 전체 코드는 다음과 같습니다.

```python
#-*- coding:utf-8 -*-

import requests
from bs4 import BeautifulSoup as bs

with requests.Session() as s:
  page = s.get('https://www.acmicpc.net/problemset')
  soup = bs(page.text, 'html.parser')

  # 문제 번호와 제목에 해당되는 태그의 정보를 주고 데이터를 받아옵니다.
  problem_number = soup.select('#problemset > tbody > tr > td:nth-of-type(1)')
  problem_title = soup.select('#problemset > tbody > tr > td:nth-of-type(2)')

  # 순차적으로 출력합니다.
  for index in range(len(problem_number)):
    print(problem_number[index].text, problem_title[index].text)
```

위 코드의 결과는 `selenium`으로 구현한 크롤러와 같습니다.

---

## 로그인해서 알고리즘 분류 가져오기

`requests`를 이용하여 로그인하는 것은 해당 사이트의 **API**에 직접 요청을 보내서 하게 됩니다. 이에 확인을 위해 `chrome 개발자 도구`를 이용하여 **login form** 태그를 확인하도록 하겠습니다.

![login_form_tag](/media/today-i-learned/programming/login_form_tag.png)

위 사진을 보면 form 태그의 `action` attribute가 `/signin`이라고 되어있습니다. 이것은 로그인을 할 때, `/signin`이라는 **API**를 사용하고, 옆에 `method` attribute가 `post`로 되어 있으므로 해당 **API**에 `post` method로 요청을 해야 한다는 의미입니다.

이제 form 태그 내부에 있는 `input` 태그들에 필요한 값들을 채워 넣고 요청을 보내야 합니다. 필요한 정보들은 해당 `input` 태그의 `name` attribute를 `key`로 하는 **dictionary**를 만들어서 전달해주면 됩니다. 즉, 다음과 같은 방식으로 진행하면 됩니다.

```python
LOGIN_INFO = {
  'login_user_id' : 'user_id',
  'login_password' : 'user_pw'
}

with request.Session() as s:
  s.post('search_url', data=LOGIN_INFO)
```

위와 같은 방식으로 `selenium`으로 했던 것처럼 `bojxxxx.yyy`의 형태로 존재하는 파일들의 이름을 넘겨주어 파일에 쓰여있는 번호에 해당하는 문제에 접근하여 **제목**과 **알고리즘 분류**를 뽑아오도록 코드를 작성하였습니다. 이에 대한 코드는 **Github**에 올려 두었습니다.
> [Source Code](https://github.com/onww1/TIL/blob/master/Python/Crawling/request_crawling.py)

`selenium`으로 작성한 코드와 `requests`로 작성한 코드를 똑같은 인풋에 대하여 실행을 해보면 확실히 속도에서 차이가 있다는 것을 확인할 수 있다.

---

지금까지 **Requests**과 **BeautifulSoup4**를 이용하여 크롤링을 하는 것에 대해서 다루었고, 실제로 제가 어떻게 사용했는지도 다루었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍