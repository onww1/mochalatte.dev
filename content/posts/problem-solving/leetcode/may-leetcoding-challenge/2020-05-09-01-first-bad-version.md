---
template: post
slug: 01-first-bad-version
draft: false
socialImage: /emoji.png
title: '[LeetCode] May LeetCoding Challenge - Day 01. First Bad Version'
date: 2020-05-09T03:54:18.424Z
description: May LeetCoding Challenge, Day 01. First Bad Version 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - May LeetCoding Challenge
---

\
안녕하세요. **Mochalatte** 입니다.

이번에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)에 이어 [May LeetCoding Challenge](https://leetcode.com/explore/challenge/card/may-leetcoding-challenge/)를 진행하고 있습니다.\
5월 한 달 동안(`2020.5.1 ~ 31`) 매일 한 문제씩 출제되고, 한국시간 기준으로 매일 오후 4시에 문제가 올라옵니다.\
한 달 동안 챌린지 문제를 풀면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

---

## Day 01. First Bad Version [🔗](https://leetcode.com/explore/challenge/card/may-leetcoding-challenge/534/week-1-may-1st-may-7th/3316/)

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API `bool isBadVersion(version)` which will return whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

**Example:**

```bash
Given n = 5, and version = 4 is the first bad version.

call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true

Then 4 is the first bad version.
```

---

이 문제는 `n`개의 `version`이 주어질 때, 처음 `bad version`이 되는 `version`을 찾는 문제입니다. 이때 처음 `bad version`이 되면 그 다음 `version`들은 모두 `bad version`이 된다는 정보도 함께 주어졌습니다.

---

### 첫 번째 접근 : 순서대로 확인하기

이 문제를 푸는 가장 단순한 방법은 순서대로 확인하는 것입니다. 처음부터 끝까지 순회하면서 `isBadVersion` API를 호출하여 `bad version`인지 확인하고 맞다면 바로 해당 `version`을 반환하면 됩니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int firstBadVersion(int n) {
        for (int version = 1; version <= n; ++version)
            if (isBadVersion(version))
                return version;
        return -1;
    }
};
```

시간 복잡도 : $O(N)$\
공간 복잡도 : $O(1)$

순서대로 확인하기 때문에 최악의 경우 모든 `version`을 확인해야 합니다. 따라서 시간 복잡도는 $N$에 비례합니다.

---

### 두 번째 접근 : 이분탐색 (Binary Search)

문제의 조건에서 `bad version`이 되고난 이후에는 계속 `bad version`이 된다고 하였습니다. 그렇다면 만약 5개의 version이 있고, version 4에서 처음 `bad version`이 되었다고 하면 API의 응답 결과는 `[false, false, false, true, true]`가 됩니다. 즉, **API의 결과는 정렬이 되어 있다**는 뜻입니다. 이러한 정렬된 상태에서는 `이분탐색`이 가능합니다. 이분탐색을 하게 되면 한 번 확인할 때마다 정답의 후보가 절반씩 줄어들기 때문에 첫 번째 접근보다 빠르게 해결할 수 있게 됩니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int firstBadVersion(int n) {
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (isBadVersion(mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }
};
```

시간 복잡도 : $O(logN)$\
공간 복잡도 : $O(1)$

한 번 확인할 때마다 후보가 절반씩 줄어들기 때문에 시간 복잡도는 $logN$에 비례합니다.

---

지금까지 **May LeetCoding Challenge**의 첫 번째 문제인 **First Bad Version**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
