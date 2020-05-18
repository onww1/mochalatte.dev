---
template: post
slug: 11-diameter-of-binary-tree
draft: false
socialImage: /emoji.png
title: '[LeetCode] 30 Day LeetCoding Challenge - Day 11. Diameter of Binary Tree'
date: 2020-05-18T22:14:11.424Z
description: LeetCode 30일 챌린지, Day 11. Diameter of Binary Tree 문제 풀이입니다.
category: Problem Solving
tags:
  - Problem Solving
  - LeetCode
  - 30 Day Challenge
  - DFS & BFS
---

\
안녕하세요. **Mochalatte** 입니다.

지난 달에 LeetCode에서 [30 Day LeetCoding Challenge](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/)를 진행했습니다.\
4월 한 달 동안(`2020.4.1 ~ 30`) 매일 한 문제씩 출제되었고, 해당 챌린지 문제를 풀어보면서 각 문제에 대한 풀이와 풀면서 필요한 팁을 공유해보고자 합니다.

추가적으로, 이번 달에도 [May LeetCoding Challenge](https://leetcode.com/explore/challenge/card/may-leetcoding-challenge/)가 진행되고 있어 함께 진행해보고자 합니다.

---

## Day 11. Diameter of Binary Tree [🔗](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/528/week-2/3293/)

Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the **longest** path between any two nodes in a tree. This path may or may not pass through the root.

**Example:**\
Given a binary tree

```bash
        1
       / \
      2   3
     / \
    4   5
```

Return **3**, which is the length of the path [4, 2, 1, 3] or [5, 2, 1, 3].

**Note:** The length of path between two nodes is represented by the number of edges between them.

---

이 문제는 `이진 트리 (Binary Tree)`의 `지름 (Diameter)`를 구하는 문제입니다. 여기서 `트리의 지름`이라는 것은 ***트리를 구성하는 임의의 두 노드의 거리 중에서 가장 긴 것***을 의미합니다. 그렇다면 `트리의 지름`은 어떻게 구할까요? `Brute Force` 방법과 `DFS`를 이용한 방법을 설명드리도록 하겠습니다.

---

### 첫 번째 접근 (Brute Force) : 모든 노드 쌍의 거리 구하기

첫 번째 접근은 트리의 edge를 모두 전처리 한 다음 모든 노드 쌍의 거리를 구해서 그 중 가장 큰 값을 사용하는 방법입니다. 한 눈에 보아도 굉장히 비효율적이지만 트리에서 가장 먼 거리의 쌍을 찾는 가장 단순한 아이디어입니다.

edge를 모두 전처리하는 방법은 **BFS**를 이용하여 각 노드에 인덱스를 주고, 각 노드에 대한 edge를 저장합니다. 그렇게 edge를 모두 구하고나면 각 노드를 시작점으로 하여 **DFS**를 하고, 해당 **DFS**는 시작점으로부터 **(가장 먼 거리 + 1)**을 리턴하므로 리턴값의 -1을 한 값을 사용합니다. 이때, (가장 먼 거리 + 1)이 나오는 이유는 DFS를 돌면서 다시 되돌아갈 때 1을 더해주는 방식을 사용하는데, 이때 시작점에서도 +1이 되기 때문입니다.

그리고 이 접근의 상황에서 DFS를 노드의 수만큼 진행을 해야 하는데, 보통 DFS는 방문체크를 하게 됩니다. 그렇다면 노드의 수만큼 방문체크를 할 배열을 초기화를 해줘야 하는데 초기화를 하는 작업도 $O(N)$의 시간 복잡도가 듭니다. 그렇기 때문에 이런 상황을 개선하기 위해 **color** 개념을 도입해서 방문을 했느냐(**true**), 안했느냐(**false**)가 아니라 해당 노드가 현재 보고있는 **color**와 같느냐, 아니냐로 방문체크를 하면 됩니다. 그러면 굳이 방문체크 배열을 초기화할 필요없어집니다.

첫 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    // edge를 전처리하는 함수
    vector<vector<int>> get_edges(TreeNode* root) {
        vector<vector<int>> edges;
        int cnt = 0;

        queue<pair<TreeNode*,int>> q;
        edges.push_back(vector<int>());
        q.push({root, cnt++});

        while (!q.empty()) {
            TreeNode* node = q.front().first;
            int idx = q.front().second;
            q.pop();

            if (node->left != NULL) {
                edges.push_back(vector<int>());
                edges[idx].push_back(cnt);
                edges[cnt].push_back(idx);
                q.push({node->left, cnt++});
            }
            if (node->right != NULL) {
                edges.push_back(vector<int>());
                edges[idx].push_back(cnt);
                edges[cnt].push_back(idx);
                q.push({node->right, cnt++});
            }
        }

        return edges;
    }

    // node를 root로 하는 sub-tree의 깊이를 구하는 함수
    int dfs(int node, vector<vector<int>>& edges, vector<int>& visit, int color) {
        visit[node] = color;
        int ret = 0;
        for (int next : edges[node])
            if (visit[next] != color)
                ret = max(ret, dfs(next, edges, visit, color));
        return ret + 1;
    }

    int diameterOfBinaryTree(TreeNode* root) {
        if (root == NULL) return 0;
        vector<vector<int>> edges = get_edges(root);
        int n = edges.size();
        vector<int> visit(n, 0);
        int answer = 0;
        for (int src = 0; src < n; ++src)
            answer = max(answer, dfs(src, edges, visit, src + 1) - 1);
        return answer;
    }
};
```

시간 복잡도 : $O(N^2)$\
공간 복잡도 : $O(N)$

시간 복잡도는 전처리의 경우 모든 노드를 보고, 각 노드에는 최대 $2$개의 자식이 있으므로 $O(N)$입니다. 그리고 **DFS**는 각 노드를 보는 것이므로 $O(N)$이고 이 작업을 $N$개의 노드에 대해서 하므로 총 $O(N^2)$이 됩니다. 이때, $O(N^2)$이 더 지배적이므로 이 알고리즘 전체의 시간 복잡도는 $O(N^2)$이 되는 것입니다.

공간 복잡도의 경우, **edges**가 2차원이지만 결국 저장하는 양은 edge의 수에 비례하므로 $O(N)$이 됩니다.

---

### 두 번째 접근 (DFS) : 서브트리의 깊이를 이용하기

첫 번째 접근에서 모든 쌍에 대하여 거리를 구했는데, 여기에는 **중복 계산**이 매우 많습니다. 그래서 딱 필요한 계산만 구할 수 있는 방법을 생각해야 합니다.

한 번 이진트리 하나의 상황을 생각해봅시다. 양쪽 서브트리의 모양이 어떻게 생겼든 그 깊이를 구할 수 있다면, 왼쪽 서브트리의 깊이가 왼쪽으로 가장 멀리 갔을 때의 거리고, 오른쪽 서브트리의 깊이가 오른쪽으로 가장 멀리 갔을 때의 거리이므로 그 둘의 합이 해당 **이진트리의 루트를 포함한 최장 길이**가 될 것입니다. 그럼 이러한 사실을 이용해서 어떤 노드이든 아무거나 하나를 root로 하여 재귀적으로 서브트리로 들어가면서 해당 **서브트리의 루트를 포함한 최장 길이**를 구해서 비교하면 됩니다.

두 번째 접근에 대한 코드는 다음과 같습니다.

```cpp
class Solution {
public:
    int getDepth(TreeNode* root, int& mx) {
        if (root == NULL) return -1;
        int left = getDepth(root->left, mx) + 1;
        int right = getDepth(root->right, mx) + 1;
        mx = max(mx, left + right);
        return max(left, right);
    }

    int diameterOfBinaryTree(TreeNode* root) {
        int mx = 0;
        getDepth(root, mx);
        return mx;
    }
};
```

시간 복잡도 : $O(N)$\
공간 복잡도 : $O(1)$

시간 복잡도는 주어진 이진 트리를 한 번만 순회하게 되므로 노드의 수에 비례하게 됩니다. 그리고 공간 복잡도는 추가 메모리를 거의 사용하지 않으므로 상수에 비례하게 됩니다.

---

지금까지 **30 Day LeetCoding Challenge**의 열한 번째 문제인 **Diameter of Binary Tree**에 대한 내용이었습니다.

혹시라도 부족한 부분이 보이시면 언제든지 **피드백**을 해주세요!

감사합니다. 🙇🏻‍
