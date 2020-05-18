---
template: post
slug: 12-last-stone-weight
draft: false
socialImage: /emoji.png
title: '[LeetCode] 30 Day LeetCoding Challenge - Day 12. Last Stone Weight'
date: 2020-05-18T23:54:04.424Z
description: LeetCode 30일 챌린지, Day 12. Last Stone Weight 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - 30 Day Challenge
  - 정렬 (Sorting)
  - 자료구조 (Data Structure)
---

\
안녕하세요. **Mochalatte** 입니다.

지난 달에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)를 진행했습니다.\
4월 한 달 동안(`2020.4.1 ~ 30`) 매일 한 문제씩 출제되었고, 해당 챌린지 문제를 풀어보면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

추가적으로, 이번 달에도 [May LeetCoding Challenge](https://leetcode.com/explore/challenge/card/may-leetcoding-challenge/)가 진행되고 있어 함께 진행해보고자 합니다.

---

## Day 12. Last Stone Weight [🔗](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/528/week-2/3297/)

We have a collection of stones, each stone has a positive integer weight.

Each turn, we choose the two **heaviest** stones and smash them together. Suppose the stones have weights `x` and `y` with `x <= y`. The result of this smash is:

- If `x == y`, both stones are totally destroyed.
- If `x != y`, the stone of weight `x` is totally destroyed, and the stone of weight `y` has new weight `y-x`.

At the end, there is at most $1$ stone left. Return the weight of this stone (or $0$ if there are no stones left.)

**Example:**

```bash
Input: [2, 7, 4, 1, 8, 1]
Output: 1
Explanation:
We combine 7 and 8 to get 1 so the array converts to [2, 4, 1, 1, 1] then,
we combine 2 and 4 to get 2 so the array converts to [2, 1, 1, 1] then,
we combine 2 and 1 to get 1 so the array converts to [1, 1, 1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of last stone.
```

\
**Note:**

- $1 \le stones.length \le 30$
- $1 \le stones[i] \le 1000$

---

이 문제는 여러 개의 돌의 무게들이 주어질 때, 어떤 프로세스를 따라 돌을 부딪치면 **최종적으로 남는 돌의 무게**가 몇인지를 알아내는 문제입니다. 프로세스는 현재 있는 돌 중에서 가장 무거운 두 돌을 골라 서로 부딪치는데, 두 돌의 무게가 다르면 두 돌의 무게 차이만큼의 돌이 남게되는 것입니다. 

이 문제는 **가장 무거운 두 돌을 얼마나 효율적으로 찾아내느냐**가 핵심입니다. 이에 대한 두 가지 방법을 보겠습니다.

---

### 첫 번째 접근 : 매 라운드마다 정렬하기

현재 가지고 있는 돌이 2개 이상이라면 해당 무게들을 오름차순으로 정렬해서 가장 큰 두 돌을 뽑아내면 됩니다. 그래서 두 돌을 한 번 부딪쳐본 다음, 그 결과에 따라 무게가 같다면 넘어가고 다르다면 그 차이만큼 다시 추가해주면 됩니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        while (stones.size() > 1) {
            sort(stones.begin(), stones.end());
            int a = stones.back(); stones.pop_back();
            int b = stones.back(); stones.pop_back();
            if (a == b) continue;
            stones.push_back(abs(a - b));
        }
        return stones.empty() ? 0 : stones.back();
    }
};
```

시간 복잡도 : $O(N^2 logN)$\
공간 복잡도 : $O(1)$

시간 복잡도는 비교 기반 정렬이 아무리 빨라야 $O(NlogN)$인데 돌의 수가 1개 이하가 될때까지 진행해야 하므로 $N$에 비례하게 되어 총 $O(N^2 logN)$이 되는 것입니다. 공간 복잡도의 경우 추가 메모리를 사용하지 않으므로 $O(1)$이 됩니다.

---

### 두 번째 접근 : 우선순위 큐 사용하기

첫 번째 접근은 매 라운드 정렬을 하게 되어 시간 복잡도에 $N$이 더 곱해지게 되었습니다. 따라서 모든 연산에 대하여 $O(logN)$의 시간 복잡도를 가지면서 최댓값 혹은 최솟값을 빠르게 구할 수 있는 **우선순위 큐 (Priority Queue)**를 이용하면 좋습니다. 우선순위 큐에 모든 돌의 무게를 입력해둔 다음, 매 라운드마다 2개씩 뽑아서 비교하고 그 결과를 저장하는 것을 반복하는 것입니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> pq;
        for (int stone: stones)
            pq.push(stone);

        while (pq.size() > 1) {
            int x = pq.top(); pq.pop();
            int y = pq.top(); pq.pop();
            if (x == y) continue;
            else pq.push(abs(x - y));
        }

        return pq.empty() ? 0 : pq.top();
    }
};
```

시간 복잡도 : $O(NlogN)$\
공간 복잡도 : $O(N)$

시간 복잡도의 경우 $N$에 비례하는 데이터를 매 연산마다 $O(logN)$으로 처리하기 때문에 총 $O(NlogN)$이 됩니다. 그리고 데이터의 수에 비례하는 양을 우선순위 큐에 저장하기 때문에 공간 복잡도가 $O(N)$이 되는 것입니다.

---

지금까지 **30 Day LeetCoding Challenge**의 열두 번째 문제인 **Last Stone Weight**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
