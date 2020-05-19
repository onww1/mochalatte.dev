---
template: post
slug: 02-jewels-and-stones
draft: false
socialImage: /emoji.png
title: '[LeetCode] May LeetCoding Challenge - Day 02. Jewels and Stones'
date: 2020-05-19T23:45:25.424Z
description: May LeetCoding Challenge, Day 02. Jewels and Stones 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - May LeetCoding Challenge
  - 
---

\
안녕하세요. **Mochalatte** 입니다.

이번에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)에 이어 [May LeetCoding Challenge](https://leetcode.com/explore/challenge/card/may-leetcoding-challenge/)를 진행하고 있습니다.\
5월 한 달 동안(`2020.5.1 ~ 31`) 매일 한 문제씩 출제되고, 한국시간 기준으로 매일 오후 4시에 문제가 올라옵니다.\
한 달 동안 챌린지 문제를 풀면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

---

## Day 02. Jewels and Stones [🔗](https://leetcode.com/explore/challenge/card/may-leetcoding-challenge/534/week-1-may-1st-may-7th/3317/)

You're given strings `J` representing the types of stones that are jewels, and `S` representing the stones you have.  Each character in `S` is a type of stone you have.  You want to know how many of the stones you have are also jewels.

The letters in `J` are guaranteed distinct, and all characters in `J` and `S` are letters. Letters are case sensitive, so `"a"` is considered a different type of stone from `"A"`.

**Example 1:**

```bash
Input: J = "aA", S = "aAAbbbb"
Output: 3
```

\
**Example 2:**

```bash
Input: J = "z", S = "ZZ"
Output: 0
```

\
**Note:**

- `S` and `J` will consist of letters and have length at most 50.
- The characters in `J` are distinct.

---

이 문제는 `J`라는 **보석에 대한 정보를 담고 있는 문자열**과 `S`라는 **돌들에 대한 정보를 담고 있는 문자열**이 주어졌을 때, `S`에 보석이 몇 개나 있는지 알아내야 하는 문제입니다. 즉, `S` 안에 `J`에 포함되는 문자들이 몇 개나 있는지 세어야 하는 문제입니다.

---

### 첫 번째 접근 : 완전 탐색 (Brute Force)

간단하게 생각해볼 수 있는 방법은 `S`에 있는 모든 문자에 대해서 `J`에서 찾는 것입니다. 그렇게 찾아서 있다면 카운트하고, 없으면 넘기면 됩니다.

```cpp
class Solution {
public:
    int numJewelsInStones(string J, string S) {
        int answer = 0;
        for (int i = 0; i < S.length(); ++i) {
            for (int j = 0; j < J.length(); ++j) {
                if (S[i] == J[j]) {
                    answer++;
                    break;
                }
            }
        }
        return answer;
    }
};
```

시간 복잡도 : $O(NM)$\
공간 복잡도 : $O(1)$

`J`의 길이를 $N$, `S`의 길이를 $M$이라고 하면 최악의 경우 `J`를 계속 다 봐야 하므로 두 길이의 곱에 비례하는 시간 복잡도를 가지게 됩니다. 그리고 추가 메모리는 사용하지 않으므로 공간 복잡도는 상수에 비례하게 됩니다.

---

### 두 번째 접근 : 자료구조 이용하여 전처리하기

`J`에서 나오는 문자의 종류가 한정적이기 때문에 자료구조에 미리 전처리해두면 `S`에서 나오는 돌이 보석인지 바로 알 수 있게 됩니다. 이때, 문자는 `1 byte`로 표현이 되므로 **길이가 256인 배열**을 만들어 두고, `J`를 순회하면서 있는 문자에 표시를 해둔 다음, `S`를 순회하면서 해당 문자가 배열에 표시가 되어 있는지 확인하고, 표시되어 있으면 카운트하면 됩니다.

여기서 물론 배열 대신 `삽입 (Insert)`과 `검색 (Search)`가 빠른 `HashSet`과 같은 자료구조를 사용하여도 무방합니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int numJewelsInStones(string J, string S) {
        bool isJewel[256]{};
        for (int i = 0; i < J.length(); ++i)
            isJewel[J[i]] = true;

        int answer = 0;
        for (int i = 0; i < S.length(); ++i)
            if (isJewel[S[i]])
                answer++;

        return answer;
    }
};
```

시간 복잡도 : $O(N + M)$\
공간 복잡도 : $O(N)$

`J`와 `S`를 각각 한 번씩 순회하므로 두 문자열 중 더 긴 문자열에 비례하는 시간 복잡도를 가지게 됩니다. 그리고 공간 복잡도는 `J`에 있는 문자들을 모두 표시해둬야 하므로 $N$에 비례하게 됩니다.

---

지금까지 **May LeetCoding Challenge**의 두 번째 문제인 **Jewels and Stones**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
