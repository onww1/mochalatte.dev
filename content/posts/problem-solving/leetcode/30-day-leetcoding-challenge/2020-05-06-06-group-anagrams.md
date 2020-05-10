---
template: post
slug: 06-group-anagrams
draft: false
socialImage: /emoji.png
title: '[LeetCode] 30 Day LeetCoding Challenge - Day 06. Group Anagrams'
date: 2020-05-06T02:03:17.424Z
description: LeetCode 30일 챌린지, Day 06. Group Anagrams 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - 30 Day Challenge
  - 해시 (Hash)
---

\
안녕하세요. **Mochalatte** 입니다.

이번에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)를 진행하고 있습니다.\
4월 한 달 동안(`2020.4.1 ~ 30`) 매일 한 문제씩 출제되고, 한국시간 기준으로 매일 오후 4시에 문제가 올라옵니다.\
한 달 동안 챌린지 문제를 풀면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

---

## Day 06. Group Anagrams [🔗](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/528/week-1/3288/)

Given an array of strings, group anagrams together.

**Example:**

```bash
Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
Output:
[
    ["ate", "eat", "tea"],
    ["nat", "tan"],
    ["bat"]
]
```

\
**Note:**

- All inputs will be in lowercase.
- The order of your output does not matter.

---

이 문제는 주어진 문자열 배열을 `anagram` 관계인 문자열끼리 그룹을 지어야 하는 문제입니다. 여기서 **"두 문자열이 `anagram` 관계이다."**라고 하는 것은 **"두 문자열을 이루고 있는 문자의 구성이 똑같다."**를 의미합니다. 예를 들면, `listen`이라는 단어와 `silent`라는 단어는 `anagram` 관계입니다. 왜냐하면 두 문자열은 모두 `['e', 'i', 'l', 'n', 's', 't']`로 이루어져 있기 때문입니다. 또 다른 예시로는 `stressed`, `desserts`가 있고, 이 둘은 모두 `['d', 'e', 'e', 'r', 's', 's', 's', 't']`로 이루어져 있습니다.

그럼 이 문제에서의 핵심은 얼마나 효율적으로 `anagram`인지를 판별할 수 있는지가 관건이 되겠습니다. 이에 대하여 세 가지 접근을 공유해보겠습니다.

---

### 첫 번째 접근 : 정렬한 문자열을 key 값으로 사용하기

`anagram`이라는 것은 문자열을 구성하고 있는 문자가 모두 같은 것이므로 각 문자열을 정렬하고나서 비교했을 때 같으면 `anagram`이라고 할 수 있습니다. 그래서 정렬된 문자열을 `key` 값으로 하여 `map`에 해당 group의 index를 저장하고, 해당 group에 문자열을 추가시키면 됩니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> groups;
        unordered_map<string, int> group_index;
        for (string str : strs) {
            string sorted_str = str;
            sort(sorted_str.begin(), sorted_str.end());

            auto it = group_index.find(sorted_str);
            if (it == group_index.end()) {
                group_index[sorted_str] = groups.size();
                vector<string> vec;
                vec.push_back(str);
                groups.push_back(vec);
            } else {
                groups[it->second].push_back(str);
            }
        }
        return groups;
    }
};
```

시간 복잡도 : $O(NKlogK)$\
공간 복잡도 : $O(NK)$

$N$은 `strs`의 길이이고, $K$는 `strs`에 있는 문자열 중 가장 긴 문자열의 길이입니다. 시간 복잡도가 $O(NKlogK)$인 이유는 문자열을 정렬하는데에 필요한 시간 복잡도가 $O(KlogK)$이고, `strs`의 길이가 $N$이기 때문입니다. 그리고 공간 복잡도가 $O(NK)$인 이유는 가장 긴 문자열의 길이가 $K$이고, 문자열의 수가 $N$이므로 최악의 경우 필요한 공간이 $O(NK)$가 되는 것입니다.

---

### 두 번째 접근 : 각 문자의 수를 key 값으로 사용하기

첫 번째 접근에서는 정렬을 하는 작업이 무조건 $O(KlogK)$이기 때문에 이것을 줄일 필요가 있습니다. 이를 위해서 **각 문자를 직접 세면 됩니다**. 그러면 문자열의 길이에 비례하는 시간 복잡도가 되므로 첫 번째 접근보다는 시간 복잡도가 개선됩니다.

이 접근에 해야 할 일은 각 문자를 직접 세고, 그 값들을 이용해서 `key`를 만들면 됩니다. 그런데 단순히 int 값을 이어 붙이기만 하면 anagram이 아닌데 anagram으로 판별할 수 있게 됩니다. 예를 들면, `aaaaaaaaaaab`와 `abbbbbbbbbbb`가 있을 때, 앞의 것은 `a`가 $11$개, `b`가 $1$개이고, 뒤의 것은 `a`가 $1$개, `b`가 $11$개이므로 둘 따 $111$이 되어 똑같은 값을 가지게 됩니다. 그러므로 **각 int 값 사이에 임의의 문자 하나**를 넣어서 구분시켜야 합니다. 여기서는 `'#'`으로 하겠습니다. 그러면 위의 예의 경우 `#11#1`과 `#1#11`이 되어 구분되게 됩니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> groups;
        unordered_map<string, int> group_index;
        int cnt[26]{};

        for (string str : strs) {
            memset(cnt, 0, sizeof(cnt));
            for (char c : str)
                cnt[c - 'a']++;
            string key = "";
            for (int i = 0; i < 26; ++i) {
                key += '#';
                key += cnt[i];
            }

            auto it = group_index.find(key);
            if (it == group_index.end()) {
                group_index[key] = groups.size();
                vector<string> vec;
                vec.push_back(str);
                groups.push_back(vec);
            } else {
                groups[it->second].push_back(str);
            }
        }
        return groups;
    }
};
```

시간 복잡도 : $O(NK)$\
공간 복잡도 : $O(NK)$

$N$과 $K$의 의미는 첫 번째 접근과 같습니다. 이때 시간 복잡도가 $O(NK)$인 이유는 각 문자열을 돌면서 문자의 수를 세고, 해당 문자의 수들을 문자열화하는 것이 문자열의 길이에 비례하기 때문에 $O(NK)$가 되는 것입니다.

---

### 세 번째 접근 : 직접 해싱(Hasing)하기

`anagram`은 문자열을 구성하는 문자의 구성이 같은 상황이므로 각 문자에 대응되는 값을 정해두고, 그 값을 그대로 곱하는 형식으로 진행하면 곱셈의 순서는 결과에 영향을 주지 않기 때문에 `anagram`일 때, 같은 결과값을 얻어낼 수 있습니다. 그래서 이러한 방식의 `hashing`을 통해 해결할 수 있습니다. 이때, 각 문자에는 **26개의 소수를 각각 대응**시키고, 문자열을 순회하면서 대응되는 소수를 곱하여 계산합니다. 그런데 문자열의 길이가 길어지면 수가 매우 커지게 되므로 적당한 소수로 **나머지 연산(modulo)**을 해야 합니다. 문제는 이 때 발생합니다.

**나머지 연산(modulo)**을 하는 순간 `anagram`이 아닌 문자열이 `anagram`으로 판별될 수 있는 상황이 발생합니다. 운이 나쁘게도 서로 다른 수가 우연히 같은 값으로 변할 수 있기 때문입니다. 그래서 보통 이럴 경우 **서로 다른 소수로 나머지 연산**을 각각 해서 나오는 두 값을 쌍으로 사용합니다. 여러 소수로 나눈 값을 함께 비교함으로써 겹칠 확률을 확 줄여버리게 되는 것입니다.

세 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int hash(string s, vector<int>& primes, int mod) {
        long long key = 1;
        for (char c : s)
            key = key * primes[c - 'a'] % mod;
        return key;
    }

    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<int, int> group_index;
        vector<vector<string>> groups;
        vector<int> primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
                              43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101};
        int mod = 1e9 + 7;

        for (string str : strs) {
            int key = hash(str, primes, mod);
            auto it = group_index.find(key);
            if (it == group_index.end()) {
                group_index[key] = groups.size();
                vector<string> vec;
                vec.push_back(str);
                groups.push_back(vec);
            } else {
                groups[it->second].push_back(str);
            }
        }
        return groups;
    }
};
```

> 이 코드에서는 `1e9 + 7`이라는 소수 하나로만 나머지 연산을 진행하여 key로 사용해도 문제가 되는 상황이 발생하지 않았습니다. 하지만 다른 소수로 테스트를 해보면 틀리는 경우도 꽤 많이 보이게 됩니다. 따라서 실험적으로 테스트를 진행하여도 좋고, 만약 대회 상황과 같이 틀리는 것이 치명적인 상황이라면 안전하게 소수 여러 개로 함께 비교하는 것이 좋습니다.

시간 복잡도 : $O(NK)$\
공간 복잡도 : $O(NK)$

이 접근의 시간 복잡도는 두 번째 접근의 시간 복잡도와 같지만 실질적으로는 더 빠릅니다. 그 이유는 map에 key로 string을 사용하게 되면 해당 문자열을 hashing하는 작업이 필요한데, **hashing에 드는 비용이 문자열의 길이에 비례**하기 때문에 시간이 들게 됩니다. 그런데 이 코드의 경우 key 값으로 int를 사용하기 때문에 string을 key로 사용하는 것에 비해 빠릅니다.

---

지금까지 **30 Day LeetCoding Challenge**의 여섯 번째 문제인 **Group Anagrams**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
