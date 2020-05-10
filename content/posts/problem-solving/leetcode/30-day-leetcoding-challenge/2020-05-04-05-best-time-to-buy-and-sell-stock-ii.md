---
template: post
slug: 05-best-time-to-buy-and-sell-stock-ii
draft: false
socialImage: /emoji.png
title: '[LeetCode] 30 Day LeetCoding Challenge - Day 05. Best Time to Buy and Sell Stock II'
date: 2020-05-04T16:43:17.424Z
description: LeetCode 30일 챌린지, Day 05. Best Time to Buy and Sell Stock II 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - 30 Day Challenge
  - 탐욕법 (Greedy)
---

\
안녕하세요. **Mochalatte** 입니다.

이번에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)를 진행하고 있습니다.\
4월 한 달 동안(`2020.4.1 ~ 30`) 매일 한 문제씩 출제되고, 한국시간 기준으로 매일 오후 4시에 문제가 올라옵니다.\
한 달 동안 챌린지 문제를 풀면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

---

## Day 05. Best Time to Buy and Sell Stock II [🔗](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/528/week-1/3287/)

Say you have an array `prices` for which the $i^{th}$ element is the price of a given stock on day $i$.

Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

**Note:** You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

**Example 1:**

```bash
Input: [7, 1, 5, 3, 6, 4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profix = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
```

**Example 2:**

```bash
Input: [1, 2, 3, 4, 5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.
```

**Example 3:**

```bash
Input: [7, 6, 4, 3, 1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

\
**Constraints:**

- $1 \le prices.length \le 3 \times 10^4$
- $0 \le prices[i] \le 10^4$

---

이 문제는 총 $N$일의 주식 가격 정보가 주어질 때, **가장 큰 이익**은 얼마인지 알아내야 하는 문제입니다. 이때, 주식을 사고 파는 것은 마음껏 할 수 있지만 가지고 있을 수 있는 주식은 **최대 하나**입니다. 그래서 주식을 사려면 이전에 가지고 있던 주식을 팔아야 합니다. 이 문제에서 가장 기본적인 것은 이익이 발생하려면 팔 때의 주식 가격이 살 때의 주식 가격보다 비싸야 한다는 것이죠. 이러한 정보를 가지고 문제를 단순한 방법부터 시작해서 풀어보도록 하겠습니다.

---

### 첫 번째 접근 : 완전 탐색 (Brute Force)

문제를 해결하는 방법으로 가장 확실한 것은 모든 경우를 확인하고 그 중 가장 큰 값을 취하는 것입니다. 그래서 저희가 생각해볼 수 있는 방법은 `완전 탐색 (Brute Force)`입니다. 이를 위해 `x일`부터 시작해서 마지막 날까지 진행했을 때, 얻을 수 있는 최대 이익을 리턴하는 함수 `calculateProfit`를 정의합니다. 이 함수를 이용해서 `x일`을 포함하여 그 이후에 이익이 발생하는 한 쌍을 발견하면 `(해당 이익) + (그 이후의 최대 이익)`으로 이익을 계산합니다. 예를 들면, $x \le a \le b$일 때, `x일` 이후 `a일`에 사고, `b일`에 팔 때 이익이 발생한다고 하면, 이익은 `(b일 가격 - a일 가격) + calculateProfit(prices, b일)`로 계산이 되는 것입니다. 그래서 이렇게 얻어지는 모든 이익을 비교하여 **최대 이익**을 얻어내는 것입니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        return calculateProfit(prices, 0);
    }

    int calculateProfit(vector<int>& prices, int pos) {
        if (pos >= prices.size()) return 0;
        int max_profit = 0;
        for (int lo = pos; lo < prices.size(); ++lo) {
            int max_value = 0;
            for (int hi = lo + 1; hi < prices.size(); ++hi) {
                if (prices[lo] < prices[hi]) {
                    int cur_profit = calculateProfit(prices, hi) + prices[hi] - prices[lo];
                    max_value = max(max_value, cur_profit);
                }
            }
            max_profit = max(max_profit, max_value);
        }
        return max_profit;
    }
};
```

이 코드의 **시간 복잡도는 $O(N^N)$**이고, **공간 복잡도는 $O(N)$**입니다. 시간 복잡도가 $O(N^N)$인 이유는 재귀함수 안에 있는 로직은 $O(N^2)$, 최악의 경우 재귀적으로 호출되는 깊이가 $N$이므로 시간 복잡도가 $O(N^{2N})$가 되고, 시간 복잡도 표기에서 상수는 생략하므로 결과적으로 $O(N^N)$이 되는 것입니다. 그리고 공간 복잡도가 $O(N)$인 이유는 추가 자료구조를 사용하지는 않았지만 재귀호출을 하게 되면 시스템 스택에 함수를 호출한 주소가 계속 쌓이게 되는데 최악의 경우 $N$번 호출하게 되므로 $O(N)$이 되는 것입니다.

---

### 두 번째 접근 : 다이나믹 프로그래밍 (Dynamic Programming; DP)

첫 번째 접근에서 완전 탐색을 진행하다 보면 구했던 값을 **중복**으로 구해야 하는 경우가 매우 많이 생기게 됩니다. 그래서 이렇게 중복으로 구하게 되는 부분은 기억하고 있다가 재활용하면 불필요한 추가 연산을 막을 수 있습니다. 즉, **`다이나믹 프로그래밍 (Dynamic Programming; DP)`** 방법을 이용하는 것입니다. 다이나믹 프로그래밍은 점화식만 잘 세우면 됩니다. 이 문제에 대한 점화식을 세워보면 다음과 같습니다.

$DP[i]$ : $i$번째 날까지 진행했을 때, 얻을 수 있는 최대 이익\
$DP[i] = max_{0 \le lo \lt i}(DP[lo] + max(prices[i] - prices[lo], 0))$

이렇게 처음부터 진행하면서 모든 날에 대한 최대 이익을 구해가면 최종적으로 마지막 날에 얻을 수 있는 최대 이익을 계산할 수 있게 됩니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.size() == 0) return 0;
        vector<int> dp(prices.size(), 0);
        for (int hi = 1; hi < prices.size(); ++hi) {
            for (int lo = 0; lo < hi; ++lo) {
                int profit = max(prices[hi] - prices[lo], 0);
                dp[hi] = max(dp[hi], dp[lo] + profit);
            }
        }
        return dp[prices.size() - 1];
    }
};
```

이 코드의 시간 복잡도는 $O(N^2)$이고, 공간 복잡도는 $O(N)$입니다. 시간 복잡도가 $O(N^2)$인 이유는 2중 for문을 돌기 때문이고, 공간 복잡도가 $O(N)$인 이유는 DP 배열을 만들었기 때문입니다.

---

### 세 번째 접근 : 극점 찾기

두 번째 접근이 첫 번째 접근에 비해 시간 복잡도를 확 줄였기는 하지만 문제의 조건은 $N$이 $30,000$이므로 여전히 `시간 초과`의 위험을 피할 수 없습니다. 그래서 더 작은 시간 복잡도의 풀이를 생각해야 합니다.

문제에 대해서 잘 생각해보면 **최대 이익**을 얻는다는 것은 **가격이 올라가려고 하기 직전에 주식을 샀다가, 떨어지기 직전에 주식을 팔면 됩니다**. 즉, 수학적으로는 `극솟값`에서 주식을 사고, `극댓값`에서 주식을 팔면 됩니다. 이때, 극솟값은 자신의 다음 값이 자신보다 큰 점이고, 극댓값은 자신의 다음 값이 자신보다 작은 점입니다.

세 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int max_profit = 0;
        int pos = 0;
        while (pos + 1 < prices.size()) {
            while (pos + 1 < prices.size() && prices[pos] >= prices[pos + 1]) pos++;
            int lo = prices[pos];
            while (pos + 1 < prices.size() && prices[pos] <= prices[pos + 1]) pos++;
            int hi = prices[pos];
            max_profit += hi - lo;
        }
        return max_profit;
    }
};
```

이 코드의 시간 복잡도는 $O(N)$이고, 공간 복잡도는 $O(1)$입니다. 시간 복잡도가 $O(N)$인 이유는 `prices`를 처음부터 끝까지 한 번만 확인하였기 때문입니다.

---

### 네 번째 접근 : 탐욕법 (Greedy) - 전 날보다 비싸면 팔기

세 번째 접근에서 첫 번째, 두 번째 접근보다 확실하게 빠른 알고리즘을 작성하였습니다. 그런데 잘 생각해보면 굳이 `극솟값`, `극댓값`을 찾을 필요가 없었습니다. 극값을 찾기 위해서 반복문을 여러개 작성해야 하고, 헷갈리기만 합니다. 주식이라는게 가장 쌀 때 사고, 가장 비쌀 때 파는 것도 최대 이익을 얻을 수 있지만, 그냥 주식을 사고, 가격이 오르자마자 파는 행위를 계속 반복해도 같은 이익을 얻을 수 있습니다.

>현실은 가격이 연속적으로 변하기 때문에 가장 쌀 때 사고, 가장 비쌀 때 파는 것이 더 큰 이익이긴 하죠..

네 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int max_profit = 0;
        for (int i = 1; i < prices.size(); ++i)
            if (prices[i] > prices[i - 1])
                max_profit += prices[i] - prices[i - 1];
        return max_profit;
    }
};
```

이 코드의 시간 복잡도 역시 $O(N)$이고, 공간 복잡도는 $O(1)$입니다.

---

지금까지 **30 Day LeetCoding Challenge**의 다섯 번째 문제인 **Best Time to Buy and Sell Stock II**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
