---
template: post
slug: 02-happy-number
draft: false
socialImage: /emoji.png
title: '[LeetCode] 30 Day LeetCoding Challenge - Day 02. Happy Number'
date: 2020-04-20T21:50:25.424Z
description: LeetCode 30일 챌린지, Day 02. Happy Number 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - 30 Day Challenge
  - DFS & BFS
---

\
안녕하세요. **Mochalatte** 입니다.

이번에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)를 진행하고 있습니다.\
4월 한 달 동안(`2020.4.1 ~ 30`) 매일 한 문제씩 출제되고, 한국시간 기준으로 매일 오후 4시에 문제가 올라옵니다.\
한 달 동안 챌린지 문제를 풀면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

---

## Day 02. Happy Number [🔗](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/528/week-1/3284/)

Write an algorithm to determine if a number `n` is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1. Those numbers for which this process **ends in 1** are happy numbers.

Return True if `n` is a happy number, and False if not.

**Example:**

```bash
Input: 19
Output: true
```

\
**Explanation:**

$1^2 + 9^2 = 82$\
$8^2 + 2^2 = 68$\
$6^2 + 8^2 = 100$\
$1^2 + 0^2 + 0^2 = 1$

---

이 문제는 양의 정수 `n`이 주어질 때, `n`이 **Happy Number**이면 `True`를, 아니라면 `False`를 리턴해야 합니다. 여기서 Happy Number란, 주어진 수의 각 자릿수 제곱의 합을 반복적으로 구했을 때 $1$로 수렴하는 수를 말합니다. 예를 들면, 문제에서 주어진 $19$와 같은 수가 **Happy Number**입니다. Explanation에서 볼 수 있듯이 $19$ → $82$ → $68$ → $100$ → $1$ → $1$ → $1$ → ... 와 같이 $1$로 수렴합니다.

그렇다면 Happy Number가 아닌 수는 어떤 수가 있을까요? $22$와 같은 수가 있습니다. 위의 과정을 똑같이 진행해보면 $22$ → $8$ → $64$ → $52$ → $29$ → $85$ → $89$ → $145$ → $42$ → $20$ → $4$ → $16$ → $17$ → $50$ → $25$ → $29$ → ... 와 같이 $1$이 아닌 $29$로 돌아가면서 cycle이 생기게 됩니다. 즉, $22$는 절대 $1$로 변할 수 없기 때문에 **Happy Number가 아닙니다**.

이와 같은 문제는 어떻게 해결할 수 있을까요? 주어진 수가 Happy Number임을 알 수 있는 것은 명확합니다. 자릿수 제곱의 합을 반복적으로 구했을 때 $1$이 나오면 바로 **Happy Number**로 판별하면 됩니다. 그런데 만약 주어진 수가 Happy Number가 아니라면 절대로 $1$에 도달하지 못하기 때문에 **무한루프**에 빠지게 됩니다. 따라서 주어진 수가 Happy Number가 아니라는 것을 알아내야 해야 합니다.

Happy Number가 아님을 알아내는 것은 변해가는 수가 cycle을 형성해서 특정 수를 기점으로 다시 똑같은 수의 변화가 나타난다는 점을 이용하면 됩니다. 즉, 이미 봤던 수가 또 다시 나오면 그 다음부터는 지금까지 나왔던 수열이 반복될 것이므로 cycle이라고 판별하고 `False`를 리턴하면 됩니다.

그렇다면 이 문제는 지금 보는 수가 이전에 봤던 수인지를 효율적으로 알아내는게 핵심이 되겠습니다.

---

### 첫 번째 접근 : Set 이용하기

\
지금 보는 수가 이전에 봤던 수인지 알기 위해서는 지금까지 봤던 수들을 기억하고 있어야 합니다. 이를 위해서 자료구조에 이전에 봤던 수를 저장하고, 지금 보는 수를 해당 자료구조에서 찾는 작업이 필요합니다. 이렇게 중복이 없는 상황에서 효율적으로 저장하고, 검색하는데에는 `Hash Set`이 가장 적절합니다. `Hash Set`은 Hash를 기반으로 하는 `Set`이기 때문에 `Search`와 `Insert`를 모두 $amortized \space O(1)$의 시간 복잡도로 해결합니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
#include <unordered_set>

class Solution {
public:
    int digit_square_sum(int num) {
        int sum = 0;
        while (num > 0) {
            int remain = num % 10;
            sum += remain * remain;
            num /= 10;
        }
        return sum;
    }

    bool isHappy(int n) {
        unordered_set<int> seen_number;
        while (n > 1) {
            if (seen_number.count(n) > 0)  // 봤던 수면 false
                return false;
            seen_number.insert(n);  // 지금 본 수를 set에 저장
            n = digit_square_sum(n);  // 자릿수 제곱 합 계산
        }
        return true;  // 여기까지 도달한 것은 n == 1이라는 의미
    }
};
```

> C++의 unordered_set이 hash table 기반으로 만들어졌기 때문에 Hash Set과 같습니다.

---

### 두 번째 접근 : Array 이용하기

\
`Hash Set`의 `Search`, `Insert`에 대한 시간 복잡도가 $amortized \space O(1)$이기 때문에 대부분의 경우 빠르게 처리되겠지만 hash 기반의 자료구조는 최악의 경우 $O(N)$의 시간 복잡도를 가지기 때문에 무조건 $O(1)$에 해결할 수 있으면 더 좋을 것 같다는 생각이 듭니다. 이를 위해서는 **Random Access**로 바로바로 확인할 수 있는 Array를 활용하면 됩니다. 다만 입력의 범위가 **int** 전체 범위이기 때문에 섣불리 Array의 size를 정하기가 어렵습니다. Array의 size는 어떻게 잡아야 할까요?

문제에서 자릿수 제곱 합을 반복적으로 한다는 것을 생각해보면 Array의 size를 한정시킬 수 있습니다. **int** 범위는 최댓값이 $2,147,483,647$과 같이 매우 크지만 이렇게 큰 수라도 **10 자리수** 밖에 되지 않기 때문에 각 자릿수 제곱 합을 하면 수의 크기가 매우 작아집니다. 이때, 이렇게 작아지는 수 중에서도 가장 큰 수를 생각해보면 $1,999,999,999$에 대하여 계산한 값인 $730$입니다. 그렇게 한 번 줄인 수로 시작하면 작은 Array size로도 해결됩니다.

그런데 이렇게 한 번 계산한 값으로 시작해도 되는걸까요? 조금만 고민해보면 괜찮다는 것을 알 수 있습니다. **Happy Number**는 어차피 $1$로 수렴하고, $1$에 대하여 자릿수 제곱 합을 구해도 $1$이기 때문에 문제가 없습니다. 그리고 **Happy Number가 아닌 수**는 자릿수 제곱 합을 계속 하더라도 $1$이 되지 않기 때문에 결국 cycle을 만나는 것은 똑같습니다. 따라서 한 번 계산한 값을 시작해도 무방합니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int digit_square_sum(int num) {
        int sum = 0;
        while (num > 0) {
            int remain = num % 10;
            sum += remain * remain;
            num /= 10;
        }
        return sum;
    }

    bool isHappy(int n) {
        bool seen_number[731]{};
        n = digit_square_sum(n);  // 매우 큰 수에 대비
        while (n > 1) {
            if (seen_number[n])  // 봤던 수면 false
                return false;
            seen_number[n] = true;  // 지금 본 수를 check
            n = digit_square_sum(n);  // 자릿수 제곱 합 계산
        }
        return true;  // 여기까지 도달한 것은 n == 1이라는 의미
    }
};
```

---

지금까지 **30 Day LeetCoding Challenge**의 두 번째 문제인 **Happy Number**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
