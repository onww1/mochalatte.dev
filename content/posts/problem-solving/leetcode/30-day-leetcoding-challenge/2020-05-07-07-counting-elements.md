---
template: post
slug: 07-counting-elements
draft: false
socialImage: /emoji.png
title: '[LeetCode] 30 Day LeetCoding Challenge - Day 07. Counting Elements'
date: 2020-05-07T02:53:17.424Z
description: LeetCode 30일 챌린지, Day 07. Counting Elements 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - 30 Day Challenge
---

\
안녕하세요. **Mochalatte** 입니다.

이번에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)를 진행하고 있습니다.\
4월 한 달 동안(`2020.4.1 ~ 30`) 매일 한 문제씩 출제되고, 한국시간 기준으로 매일 오후 4시에 문제가 올라옵니다.\
한 달 동안 챌린지 문제를 풀면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

---

## Day 07. Counting Elements [🔗](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/528/week-1/3289/)

Given an integer array `arr`, count element `x` such that `x + 1` is also in `arr`.

If there're duplicates in `arr`, count them seperately.

**Example 1:**

```bash
Input: arr = [1, 2, 3]
Output: 2
Explanation: 1 and 2 are counted cause 2 and 3 are in arr.
```

**Example 2:**

```bash
Input: arr = [1, 1, 3, 3, 5, 5, 7, 7]
Output: 0
Explanation: No numbers are counted, cause there's no 2, 4, 6, or 8 in arr.
```

**Example 3:**

```bash
Input: arr = [1, 3, 2, 3, 5, 0]
Output: 3
Explanation: 0, 1 and 2 are counted cause 1, 2 and 3 are in arr.
```

**Example 4:**

```bash
Input: arr = [1, 1, 2, 2]
Output: 2
Explanation: Two 1s are counted cause 2 is in arr.
```

\
**Constraints:**

- $1 \le arr.length \le 1000$
- $0 \le arr[i] \le 1000$

---

이 문제는 $0$ 이상 $1000$ 이하의 정수만 담긴 정수 배열 `arr`이 주어질 때, 자기 자신보다 $1$만큼 큰 수가 `arr`에 존재하는 원소의 개수를 세야 합니다. 즉, 배열에 $2$와 $3$이 있다고 하면, $2$는 $3$이 있기 때문에 카운트의 대상이 됩니다. 그럼 이 문제는 어떻게 해결해야 할까요? 정말 단순한 방법부터 시작해보겠습니다.

---

### 첫 번째 접근 : 완전 탐색 (Brute Force)

가장 단순한 방법은 `완전 탐색`입니다. 그냥 각 원소에 대해서 배열 전체를 돌면서 해당 원소보다 $1$만큼 큰 원소가 있는지 확인하고, 있다면 정답의 수를 하나 올리고 빠져나오는 것입니다. 여기서 주의할 점은 $1$만큼 큰 원소를 찾았으면 꼭 **break**를 이용하여 빠져나와야 한다는 것입니다. 만약 빠져나오지 않는다면 중복으로 셀 수 있기 때문입니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int countElements(vector<int>& arr) {
        int answer = 0;
        for (int i = 0; i < arr.size(); ++i) {
            for (int j = 0; j < arr.size(); ++j) {
                if (arr[i] + 1 == arr[j]) {
                    answer++;
                    break;
                }
            }
        }
        return answer;
    }
}
```

시간 복잡도 : $O(N^2)$\
공간 복잡도 : $O(1)$

시간 복잡도는 2중 for문을 돌고 있기 때문에 $N$의 제곱에 비례하고, 공간 복잡도는 추가 메모리를 거의 사용하고 있지 않으므로 상수에 비례합니다.

---

### 두 번째 접근 : 정렬 후 순서대로 세기

첫 번째 접근은 간단하지만 $O(N^2)$의 시간 복잡도를 가지고 있기 떄문에 조금 무겁습니다. 그럼 이것보다 조금 가벼운 알고리즘을 생각해보도록 합시다. 바로 `arr`을 **정렬**하는 것입니다. `arr`을 **오름차순 정렬**하면 작은 수가 무조건 먼저 나오게 되므로 `arr`을 앞에서부터 뒤로 가면서 인접한 원소가 $1$ 차이인지를 확인하면 됩니다. 그런데 만약 `[2, 2, 3]`과 같은 경우가 나온다면 $2$만큼 카운트가 되어야 하는데 $1$만큼만 카운트 됩니다. 이를 해결하기 위해 같은 크기의 수가 연속적으로 나온다면 그 수의 개수를 세고, 다른 수가 나왔을 때 $1$ 차이면 정답에 더해주고, 아니라면 그냥 버리면 됩니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int countElements(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int answer = 0;
        int num = 0, cnt = 0;
        for (int i = 0; i < arr.size(); ++i) {
            if (num == arr[i]) cnt++;
            else {
                if (num + 1 == arr[i])
                    answer += cnt;
                num = arr[i];
                cnt = 1;
            }
        }
        return answer;
    }
}
```

시간 복잡도 : $O(NlogN)$\
공간 복잡도 : $O(1)$

시간 복잡도는 개수를 카운트하는 과정은 $O(N)$이지만 정렬이 $O(NlogN)$이므로 정렬이 지배적이라 $NlogN$에 비례합니다. 그리고 추가 메모리는 거의 사용하고 있지 않으므로 공간 복잡도는 상수에 비례하게 됩니다.

---

### 세 번째 접근 : set 이용하여 존재하는 원소 전처리하기

두 번째 접근은 카운트를 하는 것은 $O(N)$으로 시간 복잡도가 나쁘지 않았지만, 정렬이 $O(NlogN)$이기 때문에 아직 만족스럽지 않습니다. 그럼 정렬을 하지 않고 진행을 해야 할 것 같습니다. 그런데 정렬을 하지 않으면 `arr`에 있는 수들의 순서가 뒤죽박죽이기 때문에 자신보다 $1$만큼 큰 원소가 있는지 알기가 어렵습니다. 이럴때 `조회`, `삽입`이 빠른 자료구조를 이용하여 모든 원소들을 전처리하는 것입니다. 그래서 그냥 각 원소에 $1$만큼 더한 원소가 있는지 바로바로 확인 할 수만 있으면 될 것 같습니다. 이럴 때 필요한 것이 Hash 기반의 Set인 `HashSet`입니다. `HashSet`을 가지고 `arr`을 두 번만 순회하면 됩니다.

첫 번째 순회에서는 `arr`의 원소들을 `Set`에 모두 집어넣고, 두 번째 순회에서 해당 수보다 $1$만큼 큰 수가 `Set`에 있는지 조회하고 있다면 카운트를 하나 올려주면 되는 것입니다.

세 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int countElements(vector<int>& arr) {
        unordered_set<int> s;
        for (int num : arr)
            s.insert(num);

        int answer = 0;
        for (int num : arr)
            if (s.find(num + 1) != s.end())
                answer++;
        return answer;
    }
}
```

> C++에서는 unordered_set이 Hash기반 Set입니다.

시간 복잡도 : $O(N)$\
공간 복잡도 : $O(N)$

시간 복잡도는 `HashSet`의 `조회`, `삽입`에 대한 시간 복잡도가 $amortized \space O(1)$이므로 단순히 `arr`을 순회하는 것이 지배적이라 $O(N)$이 되는 것이고, 공간 복잡도는 `Set`에 모든 원소를 삽입하는 과정이 있으므로 최악의 경우 $N$개가 들어가 $O(N)$이 되는 것입니다.

---

### 네 번째 접근 : 배열을 이용하여 한 번에 끝내기

세 번째 접근도 충분히 좋은 풀이입니다. 하지만 `HashSet`의 `조회`, `삽입`의 시간 복잡도는 최악의 경우 $O(N)$입니다. (평균적으로는 상수시간이지만요!) 그리고 `arr`을 두 번이나 순회를 해야 하는 상황입니다. 문제의 제한 범위가 컸다면 세 번째 접근이 무조건 필요했겠지만 문제의 조건에서 `arr`에 있는 수들의 범위가 $0 \le arr[i] \le 1000$ 밖에 되지 않기 때문에 배열을 가지고 한 번만 순회를 해도 해결할 수 있습니다.

이때 필요한 배열은 2개 입니다. 하나는 아직 자신보다 $1$만큼 큰 원소를 못 찾은 수를 세는 배열, 나머지 하나는 해당 수를 봤었는지를 체크하는 배열입니다. 이 두 배열을 가지고 `arr`을 한 번 순회하면서 맨 처음에는 자신보다 $1$ 작은 수에 count 값이 있는지를 확인합니다. 만약 있다면 자기 자신을 발견한 것으로 간주해도 되므로 해당 값을 정답에 더해주고 0으로 초기화시킵니다. 그리고 자신에 대한 count를 증가시키면서 check 값도 true로 바꿔줍니다. 그리고 이번에는 자신보다 $1$ 큰 수가 이전에 발견됐는지 확인하고, 발견한 적이 있다면 자신의 count 값을 정답에 더해주고 0으로 초기화시킵니다. 이렇게 `arr` 안의 모든 수를 확인하면 됩니다.

네 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    const int MAX = 1000;
    int countElements(vector<int>& arr) {
        vector<int> count(MAX + 1, 0);
        vector<bool> check(MAX + 1, false);
        int answer = 0;
        for (int num : arr) {
            if (num > 0 && count[num - 1] > 0) {
                answer += count[num - 1];
                count[num - 1] = 0;
            }
            count[num]++;
            check[num] = true;
            if (check[num + 1]) {
                answer += count[num];
                count[num] = 0;
            }
        }
        return answer;
    }
}
```

시간 복잡도 : $O(N)$\
공간 복잡도 : $O(K)$

시간 복잡도는 `arr` 배열을 한 번 순회하기 때문에 $N$에 비례하고, 공간 복잡도는 수의 최대 범위를 $K$라고 했을때, 배열의 크기를 수의 $K$에 비례하게 잡아야 하므로 공간 복잡도는 $O(K)$가 되는 것입니다.

> 네 가지 접근을 보면서 참 흥미로운 것은 시간 복잡도는 점점 줄어들면서, 공간 복잡도는 점점 늘어난다는 것입니다. 이렇게 시간을 위해서 공간이 희생하거나, 공간을 위해서 시간이 희생하는 상황이 많이 발생하므로 주어진 문제 상황에서 적절한 타협점을 찾아서 적당한 알고리즘을 잘 정하는 것이 중요합니다.

---

지금까지 **30 Day LeetCoding Challenge**의 일곱 번째 문제인 **Counting Elements**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
