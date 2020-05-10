---
template: post
slug: 09-backspace-string-compare
draft: false
socialImage: /emoji.png
title: '[LeetCode] 30 Day LeetCoding Challenge - Day 09. Backspace String Compare'
date: 2020-05-09T02:25:17.424Z
description: LeetCode 30일 챌린지, Day 09. Backspace String Compare 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - 30 Day Challenge
  - 시뮬레이션 (Simulation)
  - 투 포인터 (Two Pointer)
---

\
안녕하세요. **Mochalatte** 입니다.

지난 달에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)를 진행했습니다.\
4월 한 달 동안(`2020.4.1 ~ 30`) 매일 한 문제씩 출제되었고, 해당 챌린지 문제를 풀어보면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

추가적으로, 이번 달에도 [May LeetCoding Challenge](https://leetcode.com/explore/challenge/card/may-leetcoding-challenge/)가 진행되고 있어 함께 진행해보고자 합니다.

---

## Day 09. Backspace String Compare [🔗](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/529/week-2/3291/)

Given two strings `S` and `T`, return if they are equal when both are typed into empty text editors. `#` means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

**Example 1:**

```bash
Input: S = "ab#c", T = "ad#c"
Output: true
Explanation: Both S and T become "ac".
```

**Example 2:**

```bash
Input: S = "ab##", T = "c#d#"
Output: true
Explanation: Both S and T become "".
```

**Example 3:**

```bash
Input: S = "a##c", T = "#a#c"
Output: true
Explanation: Both S and T become "c".
```

**Example 4:**

```bash
Input: S = "a#c", T = "b"
Output: false
Explanation: S becomes "c" while T becomes "b".
```

\
**Note:**

- $1 \le S.length \le 200$
- $1 \le T.length \le 200$
- `S` and `T` only contain lowercase letters and `#` characters.

**Follow up:**

- Can you solve it in $O(N)$ time and $O(1)$ space?

---

이 문제는 어떤 에디터에 `backspace`를 포함한 입력 히스토리 두 개가 주어졌을 때, 두 입력에 의해 작성된 문자열이 같은지를 판별해야 하는 문제입니다. 이번 문제는 두 가지 접근법으로 다루어 보도록 하겠습니다.

---

### 첫 번째 접근 : 시뮬레이션(Simulation) 후 비교

키보드 입력의 히스토리가 주어졌을 때, 두 입력의 결과가 같은지를 알아내야 하므로 말그대로 키보드 입력 히스토리를 그대로 해보고 같은지를 비교해보면 됩니다. 이때 `backspace`를 처리하기 위해서 `스택 (stack)`을 이용해서 키보드 입력을 처리하면 됩니다. 그냥 문자를 만나면 `스택`에 쌓고, `backspace`를 만나면 `스택`의 가장 위에 있는 값을 빼면 되기 때문에 간단한 처리가 가능합니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    bool backspaceCompare(string S, string T) {
        vector<char> s, t;

        for (int i = 0; i < S.size(); ++i) {
            if (S[i] == '#') {
                if (!s.empty())
                    s.pop_back();
            }
            else s.push_back(S[i]);
        }

        for (int i = 0; i < T.size(); ++i) {
            if (T[i] == '#') {
                if (!t.empty())
                    t.pop_back();
            }
            else t.push_back(T[i]);
        }

        if (s.size() != t.size())
            return false;

        for (int i = 0; i < s.size(); ++i)
            if (s[i] != t[i])
                return false;

        return true;
    }
};
```

시간 복잡도 : $O(M + N)$\
공간 복잡도 : $O(M + N)$

이때 $M$은 **S의 길이**, $N$은 **T의 길이**입니다. 시간 복잡도는 시뮬레이션을 하면서 두 문자열을 모두 순회하고, 만들어진 문자열을 비교하기 위해서 또 한 번 순회하기 때문에 두 문자열의 길이에 비례하게 됩니다. 공간 복잡도는 두 문자열을 순회하면서 본 문자들을 새로운 공간에 저장하기 떄문에 이 또한 문자열의 길이에 비례하게 됩니다.

---

### 두 번째 접근 : 투 포인터(Two Pointer)

첫 번째 접근도 좋지만, 문제에서 공간 복잡도를 $O(1)$가 되도록 해결할 수 있는지 물었으니 문자들을 저장하지 않고 해결해야 합니다. 그런데 두 입력 결과가 같은지를 확인하려면 어쩔 수 없이 비교는 이루어져야 합니다. 그럼 문자열을 저장하지 않고 어떻게 효과적으로 비교를 할 수 있을까요? 문제에서 주어지는 키보드 입력 히스토리를 잘 생각해보면 `'#'`이 나오면 그 **앞에서 나왔던 문자를 지우는 것이지 뒤에 나오는 문자에는 영향을 줄 수 없습니다.** 그래서 히스토리를 뒤에서부터 읽으면서 `backspace`를 만나면 만난 수만큼 문자를 skip하고, 그 이후에 만나는 문자가 결과적으로 살아남을 문자입니다. 따라서 **두 히스토리를 읽을 포인터 2개를 만들고, 두 포인터로 살아남을 문자를 하나씩 찾아서 그때마다 비교**하면 됩니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    bool backspaceCompare(string S, string T) {
        int s = (int)S.length() - 1;
        int t = (int)T.length() - 1;
        int skipS = 0;
        int skipT = 0;

        while (s >= 0 || t >= 0) {
            while (s >= 0) {
                if (S[s] == '#') skipS++, s--;
                else if (skipS > 0) skipS--, s--;
                else break;
            }
            while (t >= 0) {
                if (T[t] == '#') skipT++, t--;
                else if (skipT > 0) skipT--, t--;
                else break;
            }

            if (s >= 0 && t >= 0 && S[s] != T[t])
                return false;

            if ((s >= 0) != (t >= 0))
                return false;

            s--; t--;
        }
        return true;
    }
};
```

시간 복잡도 : $O(M + N)$\
공간 복잡도 : $O(1)$

이때 $M$은 **S의 길이**, $N$은 **T의 길이**입니다. 시간 복잡도는 S와 T를 한 번씩 순회하므로 두 문자열의 길이에 비례하게 되는 것이고, 공간 복잡도는 각 문자열에 대한 포인터와 `backspace`의 수를 카운트하는 _skip_ 변수만 있으므로 상수에 비례합니다.

---

지금까지 **30 Day LeetCoding Challenge**의 아홉 번째 문제인 **Backspace String Compare**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
