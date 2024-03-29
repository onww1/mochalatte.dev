---
template: post
slug: 01-single-number
draft: false
socialImage: /emoji.png
title: '[LeetCode] 30 Day LeetCoding Challenge - Day 01. Single Number'
date: 2020-04-20T03:09:00.424Z
description: LeetCode 30일 챌린지, Day 01. Single Number 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - 30 Day Challenge
  - 비트 연산 (Bit Manipulation)
---

\
안녕하세요. **Mochalatte** 입니다.

이번에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)를 진행하고 있습니다.\
4월 한 달 동안(`2020.4.1 ~ 30`) 매일 한 문제씩 출제되고, 한국시간 기준으로 매일 오후 4시에 문제가 올라옵니다.\
한 달 동안 챌린지 문제를 풀면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

---

## Day 01. Single Number [🔗](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/528/week-1/3283/)

Given a **non-empty** array of integers, every element appears _twice_ except for one. Find that single one.

**Note:**

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

**Example 1:**

```bash
Input: [2, 2, 1]
Output: 1
```

**Example 2:**

```bash
Input: [4, 1, 2, 1, 2]
Output: 4
```

---

이 문제에서 요구하는 것은 하나를 제외한 모든 원소가 *두 개씩* 있는 **비어있지 않은** 정수 배열이 주어질 때, 한 개만 있는 원소를 찾는 것입니다.

또한 문제에서 추가로 요구하는 조건은 저희가 제시한 알고리즘이 $O(N)$의 시간 복잡도(Time Complexity)를 가져야 한다는 것입니다.

문제가 단순한 만큼 접근하는 방법은 많습니다. 이 문제에 대해 여러 방법으로 접근해보도록 하겠습니다.

---

### 첫 번째 접근 : 정렬 (Sorting)

\
첫 번째 접근은 정렬을 하여 두 개씩 짝을 지어 값이 같은지 비교를 하는 것입니다.
정렬을 하게 되면 두 개씩 있는 수는 연속적으로 나타나기 때문에 순서대로 비교하다가 서로 다른 두 수가 나왔을 때 앞의 수를 리턴하면 됩니다.
만약 끝까지 찾지 못한다면 가장 마지막에 있는 수가 정답이 됩니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
#include <algorithm>

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 1; i < nums.size(); i += 2) {
            if (nums[i - 1] != nums[i]) {
                return nums[i - 1]
            }
        }
        return nums.back();
    }
};
```

> for 문의 인덱스를 1부터 시작해서 2씩 증가하도록 한 것은 전체 원소의 수가 홀수개이므로 마지막 수를 제외하고 보기 위함입니다.

다만 첫 번째 접근의 시간 복잡도는 $O(NlogN)$이기 때문에 문제에서 요구하는 선형 시간을 충족하지 못합니다. 기본적으로 **비교기반 정렬**은 아무리 빨라도 $O(NlogN)$의 시간 복잡도를 가지기 때문입니다.

---

### 두 번째 접근 : 처음 본 수는 저장, 두 번 본 수는 삭제

\
두 번째 접근은 수를 저장하고 지울 수 있는 자료구조를 준비해두고, 주어진 배열을 순회하면서 지금 보고 있는 숫자가 자료구조에 없으면 저장하고, 있으면 지우도록 하는 방법입니다.

이렇게 한다면 두 개씩 있는 원소들은 자료구조에 저장되었다가 제거되고, 하나만 있는 원소는 저장만 되기 때문에 최종적으로 하나만 존재하는 수를 구할 수 있게 됩니다.

이를 위해서 현재 보고 있는 수를 자료구조에서 찾고(`Search`), 자료구조에 없다면 저장하고(`Insert`), 자료구조에 있다면 지우는(`Delete`) 과정이 필요합니다. 이때, 자료구조는 Linked List, Array, Set, Map 등의 자료구조를 사용할 수 있으며, 각 자료구조의 `Search`, `Insert`, `Delete` 작업에 대한 시간 복잡도는 다음과 같이 정리할 수 있습니다.

+----------------------------------------------------------------------------------------------------+
|                                      자료구조 별 시간 복잡도                                           |
+----------------------+-------------------------+-------------------------+-------------------------+
| 자료구조             | Search                  | Insert                  | Delete                  |
+======================+=========================+=========================+=========================+
| **Linked List**      | $O(N)$                  | $O(1)$                  | $O(1)$                  |
+----------------------+-------------------------+-------------------------+-------------------------+
| **Array** (Unsorted) | $O(N)$                  | $O(1)$                  | $O(N)$                  |
+----------------------+-------------------------+-------------------------+-------------------------+
| **Array** (Sorted)   | $O(logN)$               | $O(N)$                  | $O(N)$                  |
+----------------------+-------------------------+-------------------------+-------------------------+
| **Set** (Hash)       | $amortized \space O(1)$ | $amortized \space O(1)$ | $amortized \space O(1)$ |
+----------------------+-------------------------+-------------------------+-------------------------+
| **Set** (Tree)       | $O(logN)$               | $O(logN)$               | $O(logN)$               |
+----------------------+-------------------------+-------------------------+-------------------------+
| **Map** (Hash)       | $amortized \space O(1)$ | $amortized \space O(1)$ | $amortized \space O(1)$ |
+----------------------+-------------------------+-------------------------+-------------------------+
| **Map** (Tree)       | $O(logN)$               | $O(logN)$               | $O(logN)$               |
+----------------------+-------------------------+-------------------------+-------------------------+

> 위 표에서 `amortized`라는 것은 최악의 경우 해당 시간 복잡도는 아니지만, 평균적으로 보면 해당 시간 복잡도가 나오는 것을 의미합니다.

각 자료구조의 시간 복잡도를 고려했을 때, 문제 상황에 적합한 자료구조는 `Search`, `Insert`, `Delete`가 모두 $amortized \space O(1)$에 해결되는 `Hash Set`입니다. Hash Set을 사용하면 $N$개의 원소들을 하나씩 확인하면서 검색, 삽입, 삭제를 하여도 $amortized \space O(N)$의 시간 복잡도를 가지게 됩니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
#include <unordered_set>

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        unordered_set<int> data;  // 수를 저장하고 삭제할 set
        for (int num : nums) {
            bool exists = (data.count(num) > 0);
            if (exists) {  // set에 존재하면 두 번 본 수
                data.erase(num);
            } else {  // set에 없으면 처음 본 수
                data.insert(num);
            }
        }
        int answer = *(data.begin());
        return answer;
    }
};
```

> C++의 set은 tree로 구현되어 있기 때문에 `Tree Set`과 같고, unordered_set은 hash table로 구현되어 있기 때문에 `Hash Set`과 같습니다.

---

### 세 번째 접근 : 수학 (Mathematics)

\
세 번째 접근은 두 번째 접근과 거의 비슷하지만 삭제 과정을 없애고 수학적으로 생각해보는 것입니다. 자료구조를 이용해서 주어진 배열에 있는 값들의 고유한 값만 알아내고, 고유한 값이 2개씩 있다고 생각했을 때 실제 배열의 값을 모두 빼고 남는 것을 정답으로 생각하는 것입니다.

이 접근에 대한 예시로 `[a, b, c, a, b]`가 주어졌다고 생각해봅시다. 이 입력에서 고유한(Unique) 값은 `[a, b, c]`입니다. 이 고유한 값이 모두 2개씩 있다고 생각하면 `[a, a, b, b, c, c]`와 같고, 이를 모두 더하면 `2 * (a + b + c)`입니다. 이때, 실제 배열에 들어 있는 값들의 합은 `2 * a + 2 * b + c`이므로 두 값의 차이를 계산해 `c`를 얻어낼 수 있습니다.

> $2 * (a + b + c) - (2 * a + 2 * b + c) = c$

자료구조는 검색(`Search`)과 삽입(`Insert`)이 빠른 `Hash Set` 계열을 사용하면 됩니다. 그러면 검색과 삽입의 시간 복잡도가 $amortized \space O(1)$이고, $N$개의 원소를 돌기 때문에 전체 시간 복잡도는 $amortized \space O(N)$이 됩니다.

세 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
#include <unordered_set>

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        unordered_set<int> data;  // 고유한 수만 저장할 set
        int totalSum = 0;  // nums 배열의 전체 합을 저장할 변수
        int uniqueSum = 0;  // 고유한 수의 합을 저장할 변수
        for (int num : nums) {
            if (data.count(num) == 0) {  // 처음 본 수일 경우, set에 저장
                data.insert(num);
                uniqueSum += num;
            }
            totalSum += num;
        }
        int answer = 2 * uniqueSum - totalSum;
        return answer;
    }
};
```

> 만약 unordered_set이 아닌 일반 set을 사용한다면 tree로 구현되어 있기 때문에 시간 복잡도는 $O(NlogN)이 됩니다.

---

### 네 번째 접근 : 비트 연산 (Bit Manipulation)

\
위 두 접근의 경우 `Hash Set`을 이용하면 문제에서 요구하는 대로 선형 시간 안에 계산할 수 있습니다. 하지만 추가 자료구조를 사용하기 때문에 두 접근 모두 공간 복잡도가 $O(N)$이 됩니다. 그런데 문제에서는 추가 메모리를 사용하지 않고 해결을 할 수 있는지 물었습니다. (*Could you implement it without using extra memory?*) 이는 공간 복잡도 $O(1)$으로 문제를 해결해보라는 의미입니다. 따라서 문제 해결을 위해 주어진 수들을 저장하는 행위를 해서는 안 됩니다. 이게 어떻게 가능할까요? 이를 위해 먼저 비트 연산에 대해서 알아보겠습니다.

비트 연산에는 **AND(`&`), OR(`|`), XOR(`^`)**이 있습니다. 이는 논리 연산의 **AND**, **OR**, **XOR**과 같은 역할을 합니다.

1. **AND**의 경우, 피연산자가 모두 `True`일 때만 `True`를 리턴하고, 나머지는 모두 `False`를 리턴하는 연산
2. **OR**의 경우, 피연산자 중 하나라도 `True`일 경우 `True`를 리턴하고, 모두 `False`일 때만 `False`를 리턴하는 연산
3. **XOR**의 경우, 피연산자가 다를 경우 `True`를 리턴하고, 같을 경우 `False`를 리턴하는 연산

다만, 비트 연산은 비트 별로 같은 자리에 있는 비트끼리 논리 연산을 진행하는 것입니다.

논리 연산을 정리하면 다음 표와 같습니다.

+-------------------------------------------------------+
|                         논리 연산                       |
+---------+---------+-----------+-----------+-----------+
| a       | b       | a `AND` b | a `OR` b  | a `XOR` b |
+=========+=========+===========+===========+===========+
| True    | True    | True      | True      | False     |
+---------+---------+-----------+-----------+-----------+
| True    | False   | False     | True      | True      |
+---------+---------+-----------+-----------+-----------+
| False   | True    | False     | True      | True      |
+---------+---------+-----------+-----------+-----------+
| False   | False   | False     | False     | False     |
+---------+---------+-----------+-----------+-----------+

\
여기서 **XOR**을 집중적으로 보도록 하겠습니다. **XOR**의 경우 두 피연산자를 `a`, `b`라고 할 때, `a == b`일 경우 `False`, `a != b`일 경우 `True`를 가집니다. 이번에는 `a`와 `b`의 연산의 결과를 `a`에 다시 넣는다고 생각할 때, `b`의 값에 따라 `a`의 값이 어떻게 변하는지 보도록 하겠습니다.

1. `b`가 `False`일 경우
   1. `a`가 `False`일 경우, `a` = `a ^ b` = `False ^ False` = `False`
   2. `a`가 `True`일 경우, `a` = `a ^ b` = `True ^ False` = `True`

2. `b`가 `True`일 경우
   1. `a`가 `False`일 경우, `a` = `a ^ b` = `False ^ True` = `True`
   2. `a`가 `True`일 경우, `a` = `a ^ b` = `True ^ True` = `False`

\
위 결과를 살펴보면, `b`가 `False`일 경우 **XOR**을 하더라도 `a`의 값에 변화가 없고, `b`가 `True`일 경우 **XOR**을 하면 `a`의 값이 반전되는 것을 확인할 수 있습니다. 즉, `True` 값을 가지고 어떤 값에 **XOR**을 취하면 대상 값은 반전이 된다는 것을 알 수 있습니다. 이러한 성질을 이용하면 이 문제를 자료구조 없이 풀 수 있습니다.

모든 수는 비트로 이루어져 있고, `1`과 `0`은 `True`와 `False`로 다뤄지기 때문에 비트 연산 **XOR**을 하면 두 수의 각 비트를 비교하여 값이 같은 비트는 `0`, 값이 다른 비트는 `1`로 바뀝니다. 예를 들면, `6 (0110)`과 `18 (1010)`을 **XOR**을 하면 `24 (1100)`가 됩니다. 여기서 `18 (1010)`의 입장에서 생각해보면 비트가 `1`로 설정되어 있는 자리만 `6`의 비트가 반전된 것을 확인할 수 있습니다. 따라서 이를 이용하여 **0**에 모든 수를 **XOR**을 하면 두 번 나타나는 수는 비트 반전이 두 번 일어나기 때문에 최종적으로 변화가 없고, 한 번만 나타나는 수는 비트 반전을 한 번만 하기 때문에 최종적으로 하나만 있는 수의 비트의 영향만 받아서 그 수로 바뀌게 됩니다.

시간 복잡도를 생각해보면 **XOR**은 $O(1)$이고, $N$개의 원소를 보므로 전체적으로 $O(N)$의 시간 복잡도를 가지게 됩니다. 또한, 공간 복잡도의 경우 자료구조를 사용하지 않기 때문에 추가적인 메모리 소모가 거의 없어서 $O(1)$입니다.

네 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int answer = 0;
        for (int num : nums)
            answer ^= num;
        return answer;
    }
};
```

> 코드도 매우 짧습니다.

---

지금까지 **30 Day LeetCoding Challenge**의 첫 번째 문제인 **Single Number**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
