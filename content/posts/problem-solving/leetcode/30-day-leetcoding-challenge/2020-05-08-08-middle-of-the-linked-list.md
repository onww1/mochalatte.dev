---
template: post
slug: 08-middle-of-the-linked-list
draft: false
socialImage: /emoji.png
title: '[LeetCode] 30 Day LeetCoding Challenge - Day 08. Middle of the Linked List'
date: 2020-05-08T01:02:40.424Z
description: LeetCode 30일 챌린지, Day 08. Middle of the Linked List 문제 풀이입니다.
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

## Day 08. Middle of the Linked List [🔗](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/529/week-2/3290/)

Given a non-empty, singly linked list with head node `head`, return a middle node of linked list.

If there are two middle nodes, return the second middle node.

**Example 1:**

```bash
Input: [1, 2, 3, 4, 5]
Output: Node 3 from this list (Serialization: [3, 4, 5])
The returned node has value 3. (The judge's serialization of this node is [3, 4, 5]).
Note that we returned a ListNode object ans, such that:
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.
```

**Example 2:**

```bash
Input: [1, 2, 3, 4, 5, 6]
Output: Node 4 from this list (Serialization: [4, 5, 6])
Since the list has two middle nodes with values 3 and 4, we return the second one.
```

\
**Note:**

- The number of nodes in the given list will be between `1` and `100`.

---

이 문제는 `링크드 리스트(Linked List)`의 `첫 노드(head node)`가 주어졌을 때, `중간 노드(middle node)`를 반환해야 하는 문제입니다. 이번 문제는 세 가지 접근법을 다루어 보겠습니다.

---

### 첫 번째 접근 : 배열(벡터)에 저장하기

이 문제에서 요구하는 것은 `링크드 리스트(Linked List)`의 중간에 있는 `노드(Node)`입니다. 그리고 만약 링크드 리스트의 길이가 `짝수`일 경우, 두 개의 중간 노드 중에서 더 나중에 나오는 것을 반환하도록 되어 있습니다. 이떄, 링크드 리스트의 길이를 알 수 없기 때문에 어떤 노드가 정중앙에 있는 것인지 알 수가 없습니다. 그래서 첫 번째 접근으로는 링크드 리스트를 순회하면서 **모든 노드를 배열(벡터)에 저장**하고, 중간 노드에 해당하는 인덱스에 접근해서 해당 값을 리턴하도록 하는 것입니다. 정말 nice한 점은 홀수든, 짝수든 전체 길이에 2를 나누기만 하면 문제에서 요구하는 `중간 노드(middle node)`에 해당하는 노드의 인덱스가 된다는 점입니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        vector<ListNode*> list = {head};
        while (list.back()->next != NULL)
            list.push_back(list.back()->next);
        return list[list.size() / 2];
    }
};
```

시간 복잡도 : $O(N)$\
공간 복잡도 : $O(N)$

시간 복잡도는 링크드 리스트 전체를 한 번 순회하므로 $N$에 비례하고, 공간 복잡도는 모든 노드를 저장하므로 이 또한 $N$에 비례합니다.

---

### 두 번째 접근 : 저장하지 않고, 다시 찾아가기 (For 메모리 절약)

두 번째 접근은 첫 번째 접근과 거의 같고, 단순히 노드를 저장하지 않고 몇 번째 자리가 `중간 노드(middle node)`인지를 알아낸 다음, 포인터를 이용해 다시 찾아가 반환하는 것입니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* middleNode = head;
        int cnt = 0;
        while (head != NULL) {
            cnt++;
            head = head->next;
        }
        cnt /= 2;
        while (cnt-- > 0)
            middleNode = middleNode->next;
        return middleNode;
    }
};
```

시간 복잡도 : $O(N)$\
공간 복잡도 : $O(1)$

시간 복잡도는 링크드 리스트를 한 번 전체 순회하고, 다시 절반만큼만 순회하므로 여전히 $N$에 비례합니다. 그리고 공간 복잡도는 추가 메모리를 거의 사용하지 않았으므로 상수에 비례합니다.

---

### 세 번째 접근 : 느린 포인터와 빠른 포인터

`중간 노드(middle node)`는 링크드 리스트의 중앙에 있는 노드이므로 하나는 두 칸씩 뛰고, 하나는 한 칸씩 뛰는 두 개의 포인터를 이용해서 쉽게 구할 수 있습니다. **두 칸씩 뛰는 포인터(`빠른 포인터`)가 끝에 도달하면 한 칸씩 뛰던 포인터(`느린 포인터`)는 자연스럽게 중앙에 위치**하게 되기 때문입니다. 이때 빠른 포인터의 경우 두 칸씩 뛰기 위해서는 현재 노드와 다음 노드가 모두 존재해야 한다는 조건이 있습니다. 두 칸씩 뛰려면 뛰어 넘을 발판이 있어야 하니까요!

세 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != NULL && fast->next != NULL) {
            fast = fast->next->next;
            slow = slow->next;
        }
        return slow;
    }
};
```

시간 복잡도 : $O(N)$\
공간 복잡도 : $O(1)$

시간 복잡도는 두 칸씩 뛰더라도 결국 모든 노드를 확인하므로 $N$에 비례합니다. 그리고 공간 복잡도는 `slow`와 `fast` 변수만 사용하므로 상수에 비례합니다.

---

지금까지 **30 Day LeetCoding Challenge**의 여덟 번째 문제인 **Middle of the Linked List**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
