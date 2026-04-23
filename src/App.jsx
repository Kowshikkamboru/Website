import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Code2, Edit3, Terminal, BookOpen } from 'lucide-react';

// 50 Extracted and Curated Questions
const questionsData = [
  // ARRAYS
  { id: 1, title: "1. Find Largest Element", desc: "Find the maximum element in an array.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {1, 5, 3, 9, 2};\n    int n = 5, max = arr[0];\n    for(int i = 1; i < n; i++) {\n        if(arr[i] > max) max = arr[i];\n    }\n    printf(\"Largest: %d\\n\", max);\n    return 0;\n}",
    py: "def find_largest(arr):\n    return max(arr)\n\nprint('Largest:', find_largest([1, 5, 3, 9, 2]))" },
  { id: 2, title: "2. Reverse Array", desc: "Reverse the given array in-place.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {1, 2, 3, 4};\n    int n = 4;\n    for(int i = 0, j = n-1; i < j; i++, j--) {\n        int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;\n    }\n    for(int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    return 0;\n}",
    py: "def reverse_arr(arr):\n    return arr[::-1]\n\nprint(reverse_arr([1, 2, 3, 4]))" },
  { id: 3, title: "3. Second Largest Element", desc: "Find the second largest element in an array.",
    c: "#include <stdio.h>\n#include <limits.h>\n\nint main() {\n    int arr[] = {12, 35, 1, 10, 34, 1};\n    int n = 6, first = INT_MIN, second = INT_MIN;\n    for(int i=0; i<n; i++) {\n        if(arr[i] > first) { second = first; first = arr[i]; }\n        else if(arr[i] > second && arr[i] != first) second = arr[i];\n    }\n    printf(\"Second Largest: %d\\n\", second);\n    return 0;\n}",
    py: "def second_largest(arr):\n    unique_arr = list(set(arr))\n    unique_arr.sort()\n    return unique_arr[-2] if len(unique_arr) >= 2 else None\n\nprint('Second Largest:', second_largest([12, 35, 1, 10, 34, 1]))" },
  { id: 4, title: "4. Missing Number", desc: "Find the missing number in an array of size n containing elements from 1 to n+1.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {1, 2, 4, 5, 6};\n    int n = 5; // Array size\n    int total = (n + 1) * (n + 2) / 2;\n    for(int i = 0; i < n; i++) total -= arr[i];\n    printf(\"Missing: %d\\n\", total);\n    return 0;\n}",
    py: "def find_missing(arr, n):\n    expected_sum = (n + 1) * (n + 2) // 2\n    return expected_sum - sum(arr)\n\nprint('Missing:', find_missing([1, 2, 4, 5, 6], 5))" },
  { id: 5, title: "5. Two Sum", desc: "Find two indices such that their values sum to a specific target.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {2, 7, 11, 15}, target = 9, n = 4;\n    for(int i=0; i<n; i++) {\n        for(int j=i+1; j<n; j++) {\n            if(arr[i] + arr[j] == target) printf(\"Indices: %d, %d\\n\", i, j);\n        }\n    }\n    return 0;\n}",
    py: "def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[target - num], i]\n        seen[num] = i\n    return []\n\nprint('Indices:', two_sum([2, 7, 11, 15], 9))" },
  { id: 6, title: "6. Kadane's Algorithm", desc: "Find the maximum contiguous subarray sum.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4}, n = 9;\n    int max_so_far = arr[0], curr_max = arr[0];\n    for(int i = 1; i < n; i++) {\n        curr_max = (arr[i] > curr_max + arr[i]) ? arr[i] : curr_max + arr[i];\n        if(curr_max > max_so_far) max_so_far = curr_max;\n    }\n    printf(\"Max sum: %d\\n\", max_so_far);\n    return 0;\n}",
    py: "def max_subarray(arr):\n    max_so_far = curr_max = arr[0]\n    for x in arr[1:]:\n        curr_max = max(x, curr_max + x)\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far\n\nprint('Max sum:', max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))" },
  { id: 7, title: "7. Move Zeroes", desc: "Move all 0's to the end of the array while maintaining the relative order.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {0, 1, 0, 3, 12}, n = 5, count = 0;\n    for(int i = 0; i < n; i++) {\n        if(arr[i] != 0) arr[count++] = arr[i];\n    }\n    while(count < n) arr[count++] = 0;\n    for(int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    return 0;\n}",
    py: "def move_zeroes(arr):\n    non_zeroes = [x for x in arr if x != 0]\n    return non_zeroes + [0] * (len(arr) - len(non_zeroes))\n\nprint(move_zeroes([0, 1, 0, 3, 12]))" },
  { id: 8, title: "8. Remove Duplicates", desc: "Remove duplicates from a sorted array in-place.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {1, 1, 2, 2, 3}, n = 5, j = 0;\n    for(int i = 0; i < n-1; i++) {\n        if(arr[i] != arr[i+1]) arr[j++] = arr[i];\n    }\n    arr[j++] = arr[n-1];\n    for(int i = 0; i < j; i++) printf(\"%d \", arr[i]);\n    return 0;\n}",
    py: "def remove_duplicates(arr):\n    if not arr: return 0\n    j = 0\n    for i in range(1, len(arr)):\n        if arr[i] != arr[j]:\n            j += 1\n            arr[j] = arr[i]\n    return arr[:j+1]\n\nprint(remove_duplicates([1, 1, 2, 2, 3]))" },
  { id: 9, title: "9. Find Duplicate Number", desc: "Find the duplicate number in an array of n+1 integers.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {1, 3, 4, 2, 2};\n    int slow = arr[0], fast = arr[0];\n    do { slow = arr[slow]; fast = arr[arr[fast]]; } while(slow != fast);\n    slow = arr[0];\n    while(slow != fast) { slow = arr[slow]; fast = arr[fast]; }\n    printf(\"Duplicate: %d\\n\", slow);\n    return 0;\n}",
    py: "def find_duplicate(nums):\n    slow, fast = nums[0], nums[0]\n    while True:\n        slow, fast = nums[slow], nums[nums[fast]]\n        if slow == fast: break\n    slow = nums[0]\n    while slow != fast:\n        slow, fast = nums[slow], nums[fast]\n    return slow\n\nprint('Duplicate:', find_duplicate([1, 3, 4, 2, 2]))" },
  { id: 10, title: "10. Leaders in Array", desc: "Print all leaders (element greater than all elements to its right).",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {16, 17, 4, 3, 5, 2}, n = 6;\n    int max_from_right = arr[n-1];\n    printf(\"%d \", max_from_right);\n    for(int i = n-2; i >= 0; i--) {\n        if(arr[i] >= max_from_right) {\n            max_from_right = arr[i];\n            printf(\"%d \", max_from_right);\n        }\n    }\n    return 0;\n}",
    py: "def find_leaders(arr):\n    n = len(arr)\n    max_right = arr[-1]\n    leaders = [max_right]\n    for i in range(n-2, -1, -1):\n        if arr[i] >= max_right:\n            max_right = arr[i]\n            leaders.append(max_right)\n    return leaders[::-1]\n\nprint('Leaders:', find_leaders([16, 17, 4, 3, 5, 2]))" },

  // STRINGS
  { id: 11, title: "11. Palindrome String", desc: "Check if a string is a palindrome.",
    c: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"madam\";\n    int l = 0, h = strlen(str) - 1, isPalin = 1;\n    while(l < h) {\n        if(str[l++] != str[h--]) { isPalin = 0; break; }\n    }\n    if(isPalin) printf(\"Palindrome\\n\");\n    else printf(\"Not Palindrome\\n\");\n    return 0;\n}",
    py: "def is_palindrome(s):\n    return s == s[::-1]\n\nprint('Is Palindrome:', is_palindrome('madam'))" },
  { id: 12, title: "12. Reverse String", desc: "Reverse a string in-place.",
    c: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"hello\";\n    int n = strlen(str);\n    for(int i = 0, j = n-1; i < j; i++, j--) {\n        char temp = str[i]; str[i] = str[j]; str[j] = temp;\n    }\n    printf(\"Reversed: %s\\n\", str);\n    return 0;\n}",
    py: "def reverse_string(s):\n    return s[::-1]\n\nprint('Reversed:', reverse_string('hello'))" },
  { id: 13, title: "13. Count Vowels", desc: "Count the number of vowels in a given string.",
    c: "#include <stdio.h>\n#include <ctype.h>\n\nint main() {\n    char str[] = \"Infosys\";\n    int count = 0;\n    for(int i=0; str[i] != '\\0'; i++) {\n        char c = tolower(str[i]);\n        if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++;\n    }\n    printf(\"Vowels: %d\\n\", count);\n    return 0;\n}",
    py: "def count_vowels(s):\n    vowels = set('aeiouAEIOU')\n    return sum(1 for char in s if char in vowels)\n\nprint('Vowels:', count_vowels('Infosys'))" },
  { id: 14, title: "14. Valid Anagram", desc: "Check if two strings are anagrams of each other.",
    c: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[] = \"listen\", s2[] = \"silent\";\n    int count[256] = {0};\n    if(strlen(s1) != strlen(s2)) { printf(\"Not Anagram\\n\"); return 0; }\n    for(int i=0; s1[i]; i++) { count[s1[i]]++; count[s2[i]]--; }\n    for(int i=0; i<256; i++) if(count[i] != 0) { printf(\"Not Anagram\\n\"); return 0; }\n    printf(\"Anagram\\n\");\n    return 0;\n}",
    py: "def is_anagram(s1, s2):\n    return sorted(s1) == sorted(s2)\n\nprint('Is Anagram:', is_anagram('listen', 'silent'))" },
  { id: 15, title: "15. First Unique Character", desc: "Find the first non-repeating character in a string.",
    c: "#include <stdio.h>\n\nint main() {\n    char str[] = \"leetcode\";\n    int count[256] = {0};\n    for(int i=0; str[i]; i++) count[str[i]]++;\n    for(int i=0; str[i]; i++) {\n        if(count[str[i]] == 1) { printf(\"First Unique: %c\\n\", str[i]); return 0; }\n    }\n    printf(\"None\\n\");\n    return 0;\n}",
    py: "def first_unique(s):\n    from collections import Counter\n    count = Counter(s)\n    for char in s:\n        if count[char] == 1:\n            return char\n    return None\n\nprint('First Unique:', first_unique('leetcode'))" },
  { id: 16, title: "16. Longest Common Prefix", desc: "Find the longest common prefix string amongst an array of strings.",
    c: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char *strs[] = {\"flower\", \"flow\", \"flight\"};\n    int n = 3; char res[100]; strcpy(res, strs[0]);\n    for(int i=1; i<n; i++) {\n        int j=0;\n        while(res[j] && strs[i][j] && res[j] == strs[i][j]) j++;\n        res[j] = '\\0';\n    }\n    printf(\"Prefix: %s\\n\", res);\n    return 0;\n}",
    py: "def longest_common_prefix(strs):\n    if not strs: return ''\n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix):\n            prefix = prefix[:-1]\n    return prefix\n\nprint('Prefix:', longest_common_prefix(['flower', 'flow', 'flight']))" },
  { id: 17, title: "17. String to Integer (atoi)", desc: "Implement the atoi function which converts a string to an integer.",
    c: "#include <stdio.h>\n\nint main() {\n    char str[] = \"  -42\";\n    int res = 0, sign = 1, i = 0;\n    while(str[i] == ' ') i++;\n    if(str[i] == '-' || str[i] == '+') sign = 1 - 2 * (str[i++] == '-');\n    while(str[i] >= '0' && str[i] <= '9') {\n        res = res * 10 + (str[i++] - '0');\n    }\n    printf(\"Integer: %d\\n\", res * sign);\n    return 0;\n}",
    py: "def my_atoi(s):\n    s = s.strip()\n    if not s: return 0\n    sign = -1 if s[0] == '-' else 1\n    if s[0] in ['-', '+']: s = s[1:]\n    res = 0\n    for char in s:\n        if not char.isdigit(): break\n        res = res * 10 + int(char)\n    return sign * res\n\nprint('Integer:', my_atoi('  -42'))" },
  { id: 18, title: "18. Valid Parentheses", desc: "Check if the input string has valid and matched parentheses.",
    c: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[] = \"()[]{}\", stack[100]; int top = -1, valid = 1;\n    for(int i=0; s[i]; i++) {\n        if(s[i]=='(' || s[i]=='{' || s[i]=='[') stack[++top] = s[i];\n        else {\n            if(top==-1) { valid = 0; break; }\n            char c = stack[top--];\n            if((s[i]==')' && c!='(') || (s[i]=='}' && c!='{') || (s[i]==']' && c!='[')) { valid = 0; break; }\n        }\n    }\n    if(top != -1) valid = 0;\n    printf(valid ? \"Valid\\n\" : \"Invalid\\n\");\n    return 0;\n}",
    py: "def is_valid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element: return False\n        else:\n            stack.append(char)\n    return not stack\n\nprint('Is Valid:', is_valid('()[]{}'))" },
  { id: 19, title: "19. Count Words in String", desc: "Count the number of words in a given string.",
    c: "#include <stdio.h>\n\nint main() {\n    char str[] = \"Hello   world this is C\";\n    int count = 0, inWord = 0;\n    for(int i = 0; str[i] != '\\0'; i++) {\n        if(str[i] == ' ' || str[i] == '\\n' || str[i] == '\\t') inWord = 0;\n        else if(inWord == 0) { inWord = 1; count++; }\n    }\n    printf(\"Words: %d\\n\", count);\n    return 0;\n}",
    py: "def count_words(s):\n    return len(s.split())\n\nprint('Words:', count_words('Hello   world this is Python'))" },
  { id: 20, title: "20. Length of Last Word", desc: "Return the length of the last word in the string.",
    c: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[] = \"   fly me   to   the moon  \";\n    int len = 0, i = strlen(s) - 1;\n    while(i >= 0 && s[i] == ' ') i--;\n    while(i >= 0 && s[i] != ' ') { len++; i--; }\n    printf(\"Length: %d\\n\", len);\n    return 0;\n}",
    py: "def length_of_last_word(s):\n    words = s.split()\n    return len(words[-1]) if words else 0\n\nprint('Length:', length_of_last_word('   fly me   to   the moon  '))" },

  // MATH
  { id: 21, title: "21. Prime Number", desc: "Check if a given number is prime.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 17, isPrime = 1;\n    if(n <= 1) isPrime = 0;\n    for(int i = 2; i * i <= n; i++) {\n        if(n % i == 0) { isPrime = 0; break; }\n    }\n    printf(isPrime ? \"Prime\\n\" : \"Not Prime\\n\");\n    return 0;\n}",
    py: "def is_prime(n):\n    if n <= 1: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True\n\nprint('Is Prime:', is_prime(17))" },
  { id: 22, title: "22. Fibonacci Sequence", desc: "Print the nth Fibonacci number.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 7, a = 0, b = 1, c;\n    if(n == 0) printf(\"0\\n\");\n    else {\n        for(int i = 2; i <= n; i++) { c = a + b; a = b; b = c; }\n        printf(\"Fibonacci: %d\\n\", b);\n    }\n    return 0;\n}",
    py: "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n\nprint('Fibonacci:', fibonacci(7))" },
  { id: 23, title: "23. Factorial", desc: "Calculate the factorial of a number.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 5; long long fact = 1;\n    for(int i = 1; i <= n; i++) fact *= i;\n    printf(\"Factorial: %lld\\n\", fact);\n    return 0;\n}",
    py: "def factorial(n):\n    res = 1\n    for i in range(1, n + 1):\n        res *= i\n    return res\n\nprint('Factorial:', factorial(5))" },
  { id: 24, title: "24. Armstrong Number", desc: "Check if a number is an Armstrong number.",
    c: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    int n = 153, temp = n, sum = 0, digits = 0;\n    while(temp != 0) { digits++; temp /= 10; }\n    temp = n;\n    while(temp != 0) { sum += pow(temp % 10, digits); temp /= 10; }\n    printf(sum == n ? \"Armstrong\\n\" : \"Not Armstrong\\n\");\n    return 0;\n}",
    py: "def is_armstrong(n):\n    s = str(n)\n    power = len(s)\n    return n == sum(int(digit)**power for digit in s)\n\nprint('Is Armstrong:', is_armstrong(153))" },
  { id: 25, title: "25. Sum of Digits", desc: "Calculate the sum of digits of a number.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 1234, sum = 0;\n    while(n > 0) { sum += n % 10; n /= 10; }\n    printf(\"Sum: %d\\n\", sum);\n    return 0;\n}",
    py: "def sum_digits(n):\n    return sum(int(digit) for digit in str(n))\n\nprint('Sum:', sum_digits(1234))" },
  { id: 26, title: "26. Power of a Number", desc: "Calculate x raised to the power n.",
    c: "#include <stdio.h>\n\nint main() {\n    double x = 2.0, res = 1.0; int n = 5;\n    for(int i = 0; i < n; i++) res *= x;\n    printf(\"Result: %.2f\\n\", res);\n    return 0;\n}",
    py: "def power(x, n):\n    return x ** n\n\nprint('Result:', power(2, 5))" },
  { id: 27, title: "27. Spy Number", desc: "Check if sum of digits equals product of digits.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 132, sum = 0, prod = 1;\n    while(n > 0) {\n        int d = n % 10; sum += d; prod *= d; n /= 10;\n    }\n    printf(sum == prod ? \"Spy Number\\n\" : \"Not Spy Number\\n\");\n    return 0;\n}",
    py: "def is_spy(n):\n    digits = [int(d) for d in str(n)]\n    import math\n    return sum(digits) == math.prod(digits)\n\nprint('Is Spy:', is_spy(132))" },
  { id: 28, title: "28. Palindrome Number", desc: "Check if an integer reads the same forward and backward.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 121, rev = 0, temp = n;\n    while(temp > 0) { rev = rev * 10 + temp % 10; temp /= 10; }\n    printf(n == rev ? \"Palindrome\\n\" : \"Not Palindrome\\n\");\n    return 0;\n}",
    py: "def is_palindrome_num(n):\n    return str(n) == str(n)[::-1]\n\nprint('Is Palindrome:', is_palindrome_num(121))" },
  { id: 29, title: "29. Count Digits", desc: "Count the total number of digits in an integer.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 98765, count = 0;\n    if(n == 0) count = 1;\n    while(n != 0) { n /= 10; count++; }\n    printf(\"Digits: %d\\n\", count);\n    return 0;\n}",
    py: "def count_digits(n):\n    return len(str(abs(n)))\n\nprint('Digits:', count_digits(98765))" },
  { id: 30, title: "30. Equilibrium Index", desc: "Find the index where sum of left elements equals sum of right elements.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {-7, 1, 5, 2, -4, 3, 0}, n = 7;\n    int sum = 0, left_sum = 0;\n    for(int i = 0; i < n; ++i) sum += arr[i];\n    for(int i = 0; i < n; ++i) {\n        sum -= arr[i]; // sum is now right sum\n        if(left_sum == sum) { printf(\"Equilibrium Index: %d\\n\", i); return 0; }\n        left_sum += arr[i];\n    }\n    printf(\"No Equilibrium\\n\");\n    return 0;\n}",
    py: "def equilibrium_index(arr):\n    total_sum = sum(arr)\n    left_sum = 0\n    for i, num in enumerate(arr):\n        total_sum -= num\n        if left_sum == total_sum: return i\n        left_sum += num\n    return -1\n\nprint('Index:', equilibrium_index([-7, 1, 5, 2, -4, 3, 0]))" },

  // SEARCHING AND SORTING
  { id: 31, title: "31. Linear Search", desc: "Search for an element in an array linearly.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40}, key = 30, n = 4, res = -1;\n    for(int i = 0; i < n; i++) if(arr[i] == key) res = i;\n    printf(\"Found at: %d\\n\", res);\n    return 0;\n}",
    py: "def linear_search(arr, key):\n    for i, x in enumerate(arr):\n        if x == key: return i\n    return -1\n\nprint('Found at:', linear_search([10, 20, 30, 40], 30))" },
  { id: 32, title: "32. Binary Search", desc: "Search a sorted array using divide and conquer.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {2, 4, 6, 8, 10}, key = 8, l = 0, r = 4, res = -1;\n    while(l <= r) {\n        int mid = l + (r - l) / 2;\n        if(arr[mid] == key) { res = mid; break; }\n        else if(arr[mid] < key) l = mid + 1;\n        else r = mid - 1;\n    }\n    printf(\"Found at: %d\\n\", res);\n    return 0;\n}",
    py: "def binary_search(arr, key):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        mid = l + (r - l) // 2\n        if arr[mid] == key: return mid\n        elif arr[mid] < key: l = mid + 1\n        else: r = mid - 1\n    return -1\n\nprint('Found at:', binary_search([2, 4, 6, 8, 10], 8))" },
  { id: 33, title: "33. Bubble Sort", desc: "Sort an array using Bubble Sort algorithm.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22, 11, 90}, n = 7;\n    for(int i = 0; i < n-1; i++) {\n        for(int j = 0; j < n-i-1; j++) {\n            if(arr[j] > arr[j+1]) { \n                int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;\n            }\n        }\n    }\n    for(int i=0; i<n; i++) printf(\"%d \", arr[i]);\n    return 0;\n}",
    py: "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))" },
  { id: 34, title: "34. Selection Sort", desc: "Sort an array using Selection Sort.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {64, 25, 12, 22, 11}, n = 5;\n    for(int i=0; i<n-1; i++) {\n        int min_idx = i;\n        for(int j=i+1; j<n; j++) if(arr[j] < arr[min_idx]) min_idx = j;\n        int temp = arr[min_idx]; arr[min_idx] = arr[i]; arr[i] = temp;\n    }\n    for(int i=0; i<n; i++) printf(\"%d \", arr[i]);\n    return 0;\n}",
    py: "def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i+1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\nprint(selection_sort([64, 25, 12, 22, 11]))" },
  { id: 35, title: "35. Insertion Sort", desc: "Sort an array using Insertion Sort.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {12, 11, 13, 5, 6}, n = 5;\n    for(int i=1; i<n; i++) {\n        int key = arr[i], j = i - 1;\n        while(j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }\n        arr[j+1] = key;\n    }\n    for(int i=0; i<n; i++) printf(\"%d \", arr[i]);\n    return 0;\n}",
    py: "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n\nprint(insertion_sort([12, 11, 13, 5, 6]))" },
  { id: 36, title: "36. Merge Sorted Arrays", desc: "Merge two sorted arrays into one.",
    c: "#include <stdio.h>\n\nint main() {\n    int a[]={1,3,5}, b[]={2,4,6}, c[6], i=0, j=0, k=0;\n    while(i<3 && j<3) {\n        if(a[i] < b[j]) c[k++] = a[i++];\n        else c[k++] = b[j++];\n    }\n    while(i<3) c[k++] = a[i++];\n    while(j<3) c[k++] = b[j++];\n    for(int x=0; x<6; x++) printf(\"%d \", c[x]);\n    return 0;\n}",
    py: "def merge_arrays(a, b):\n    return sorted(a + b)\n\nprint(merge_arrays([1,3,5], [2,4,6]))" },
  { id: 37, title: "37. Search Insert Position", desc: "Return the index if the target is found, or where it would be if inserted.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[]={1,3,5,6}, target=5, n=4;\n    int l=0, r=n-1, ans=n;\n    while(l <= r) {\n        int mid = l + (r - l) / 2;\n        if(arr[mid] >= target) { ans = mid; r = mid - 1; }\n        else l = mid + 1;\n    }\n    printf(\"Index: %d\\n\", ans);\n    return 0;\n}",
    py: "def search_insert(arr, target):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return l\n\nprint('Index:', search_insert([1,3,5,6], 5))" },
  { id: 38, title: "38. Majority Element", desc: "Find the element that appears more than n/2 times.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[]={2,2,1,1,1,2,2}, n=7, count=0, cand=0;\n    for(int i=0; i<n; i++) {\n        if(count == 0) cand = arr[i];\n        count += (arr[i] == cand) ? 1 : -1;\n    }\n    printf(\"Majority: %d\\n\", cand);\n    return 0;\n}",
    py: "def majority_element(arr):\n    count, cand = 0, None\n    for num in arr:\n        if count == 0: cand = num\n        count += 1 if num == cand else -1\n    return cand\n\nprint('Majority:', majority_element([2,2,1,1,1,2,2]))" },
  { id: 39, title: "39. Count Frequency", desc: "Count frequencies of elements in an array.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 20, 10, 10, 20, 5, 20};\n    int n = 8, visited[8] = {0};\n    for(int i=0; i<n; i++) {\n        if(visited[i] == 1) continue;\n        int count = 1;\n        for(int j=i+1; j<n; j++) {\n            if(arr[i] == arr[j]) { visited[j] = 1; count++; }\n        }\n        printf(\"%d: %d\\n\", arr[i], count);\n    }\n    return 0;\n}",
    py: "def count_freq(arr):\n    from collections import Counter\n    return dict(Counter(arr))\n\nprint(count_freq([10, 20, 20, 10, 10, 20, 5, 20]))" },
  { id: 40, title: "40. Best Time to Buy and Sell Stock", desc: "Find the maximum profit you can achieve.",
    c: "#include <stdio.h>\n#include <limits.h>\n\nint main() {\n    int prices[] = {7,1,5,3,6,4}, n = 6;\n    int min_price = INT_MAX, max_profit = 0;\n    for(int i=0; i<n; i++) {\n        if(prices[i] < min_price) min_price = prices[i];\n        else if(prices[i] - min_price > max_profit) max_profit = prices[i] - min_price;\n    }\n    printf(\"Profit: %d\\n\", max_profit);\n    return 0;\n}",
    py: "def max_profit(prices):\n    min_price = float('inf')\n    max_prof = 0\n    for price in prices:\n        min_price = min(min_price, price)\n        max_prof = max(max_prof, price - min_price)\n    return max_prof\n\nprint('Profit:', max_profit([7,1,5,3,6,4]))" },

  // ADVANCED & PATTERNS
  { id: 41, title: "41. Container With Most Water", desc: "Find two lines that together with the x-axis form a container, storing the most water.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[]={1,8,6,2,5,4,8,3,7}, n=9, max_area=0;\n    int l=0, r=n-1;\n    while(l < r) {\n        int h = arr[l] < arr[r] ? arr[l] : arr[r];\n        int area = h * (r - l);\n        if(area > max_area) max_area = area;\n        if(arr[l] < arr[r]) l++; else r--;\n    }\n    printf(\"Area: %d\\n\", max_area);\n    return 0;\n}",
    py: "def max_area(height):\n    l, r, mx = 0, len(height) - 1, 0\n    while l < r:\n        mx = max(mx, min(height[l], height[r]) * (r - l))\n        if height[l] < height[r]: l += 1\n        else: r -= 1\n    return mx\n\nprint('Area:', max_area([1,8,6,2,5,4,8,3,7]))" },
  { id: 42, title: "42. Longest Increasing Subsequence", desc: "Find the length of the longest strictly increasing subsequence.",
    c: "#include <stdio.h>\n\nint main() {\n    int arr[]={10,9,2,5,3,7,101,18}, n=8;\n    int lis[8], max=0;\n    for(int i=0; i<n; i++) { lis[i] = 1; }\n    for(int i=1; i<n; i++) {\n        for(int j=0; j<i; j++) {\n            if(arr[i] > arr[j] && lis[i] < lis[j] + 1) lis[i] = lis[j] + 1;\n        }\n    }\n    for(int i=0; i<n; i++) if(max < lis[i]) max = lis[i];\n    printf(\"Length: %d\\n\", max);\n    return 0;\n}",
    py: "def length_of_LIS(nums):\n    if not nums: return 0\n    dp = [1] * len(nums)\n    for i in range(1, len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)\n\nprint('Length:', length_of_LIS([10,9,2,5,3,7,101,18]))" },
  { id: 43, title: "43. Word Break", desc: "Determine if string can be segmented into a space-separated sequence of dictionary words.",
    c: "#include <stdio.h>\n#include <string.h>\n// Simplified version: true if \"leetcode\" can be split to \"leet\" \"code\"\nint main() {\n    char s[] = \"leetcode\"; int dp[9] = {0}; dp[0] = 1;\n    char *dict[] = {\"leet\", \"code\"};\n    for(int i=1; i<=8; i++) {\n        for(int j=0; j<i; j++) {\n            if(dp[j]) {\n                char sub[10]; strncpy(sub, s+j, i-j); sub[i-j] = '\\0';\n                for(int k=0; k<2; k++) if(strcmp(sub, dict[k])==0) dp[i] = 1;\n            }\n        }\n    }\n    printf(dp[8] ? \"True\\n\" : \"False\\n\");\n    return 0;\n}",
    py: "def word_break(s, word_dict):\n    dp = [False] * (len(s) + 1)\n    dp[0] = True\n    for i in range(1, len(s) + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in word_dict:\n                dp[i] = True\n                break\n    return dp[-1]\n\nprint(word_break('leetcode', ['leet', 'code']))" },
  { id: 44, title: "44. Decode Ways", desc: "Count total combinations of decoding a string of numbers.",
    c: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[] = \"226\"; int n = strlen(s);\n    int dp[100] = {0}; dp[0] = 1; dp[1] = s[0] == '0' ? 0 : 1;\n    for(int i=2; i<=n; i++) {\n        if(s[i-1] != '0') dp[i] += dp[i-1];\n        int two_digit = (s[i-2]-'0')*10 + (s[i-1]-'0');\n        if(two_digit >= 10 && two_digit <= 26) dp[i] += dp[i-2];\n    }\n    printf(\"Ways: %d\\n\", dp[n]);\n    return 0;\n}",
    py: "def num_decodings(s):\n    if not s or s[0] == '0': return 0\n    prev, curr = 1, 1\n    for i in range(1, len(s)):\n        temp = curr\n        if s[i] == '0': curr = 0\n        if s[i-1] == '1' or (s[i-1] == '2' and s[i] <= '6'):\n            curr += prev\n        prev = temp\n    return curr\n\nprint('Ways:', num_decodings('226'))" },
  { id: 45, title: "45. Tower of Hanoi", desc: "Solve the Tower of Hanoi puzzle.",
    c: "#include <stdio.h>\n\nvoid hanoi(int n, char from, char to, char aux) {\n    if(n == 0) return;\n    hanoi(n-1, from, aux, to);\n    printf(\"Move %d from %c to %c\\n\", n, from, to);\n    hanoi(n-1, aux, to, from);\n}\n\nint main() {\n    hanoi(3, 'A', 'C', 'B');\n    return 0;\n}",
    py: "def hanoi(n, source, target, aux):\n    if n > 0:\n        hanoi(n-1, source, aux, target)\n        print(f'Move {n} from {source} to {target}')\n        hanoi(n-1, aux, target, source)\n\nhanoi(3, 'A', 'C', 'B')" },
  { id: 46, title: "46. Right Triangle Pattern", desc: "Print a right-angled triangle pattern of stars.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    for(int i = 1; i <= n; i++) {\n        for(int j = 1; j <= i; j++) printf(\"*\");\n        printf(\"\\n\");\n    }\n    return 0;\n}",
    py: "def print_triangle(n):\n    for i in range(1, n + 1):\n        print('*' * i)\n\nprint_triangle(5)" },
  { id: 47, title: "47. Pyramid Pattern", desc: "Print a centered pyramid pattern of stars.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    for(int i = 1; i <= n; i++) {\n        for(int j = i; j < n; j++) printf(\" \");\n        for(int k = 1; k <= (2 * i - 1); k++) printf(\"*\");\n        printf(\"\\n\");\n    }\n    return 0;\n}",
    py: "def print_pyramid(n):\n    for i in range(1, n + 1):\n        print(' ' * (n - i) + '*' * (2 * i - 1))\n\nprint_pyramid(5)" },
  { id: 48, title: "48. Climbing Stairs", desc: "Find how many distinct ways you can climb to the top of n stairs.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 5, a = 1, b = 1, c;\n    for(int i = 2; i <= n; i++) { c = a + b; a = b; b = c; }\n    printf(\"Ways: %d\\n\", b);\n    return 0;\n}",
    py: "def climb_stairs(n):\n    a, b = 1, 1\n    for _ in range(n - 1):\n        a, b = b, a + b\n    return b\n\nprint('Ways:', climb_stairs(5))" },
  { id: 49, title: "49. Coin Change", desc: "Find minimum number of coins to make up a given amount.",
    c: "#include <stdio.h>\n#define MIN(a,b) ((a)<(b)?(a):(b))\n\nint main() {\n    int coins[]={1,2,5}, amount=11;\n    int dp[12]; dp[0]=0;\n    for(int i=1; i<=amount; i++) dp[i]=99999;\n    for(int i=1; i<=amount; i++) {\n        for(int j=0; j<3; j++) {\n            if(coins[j] <= i) dp[i] = MIN(dp[i], dp[i - coins[j]] + 1);\n        }\n    }\n    printf(\"Coins: %d\\n\", dp[amount] > amount ? -1 : dp[amount]);\n    return 0;\n}",
    py: "def coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for coin in coins:\n        for x in range(coin, amount + 1):\n            dp[x] = min(dp[x], dp[x - coin] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1\n\nprint('Coins:', coin_change([1, 2, 5], 11))" },
  { id: 50, title: "50. Pascal's Triangle", desc: "Print the first N rows of Pascal's triangle.",
    c: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    for(int i=0; i<n; i++) {\n        int val = 1;\n        for(int j=0; j<=i; j++) {\n            printf(\"%d \", val);\n            val = val * (i - j) / (j + 1);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
    py: "def generate_pascals(n):\n    triangle = []\n    for i in range(n):\n        row = [1] * (i + 1)\n        for j in range(1, i):\n            row[j] = triangle[i-1][j-1] + triangle[i-1][j]\n        triangle.append(row)\n        print(row)\n\ngenerate_pascals(5)" }
];


export default function App() {
  const [completedItems, setCompletedItems] = useState({});
  const [customCodes, setCustomCodes] = useState({});
  const [globalLang, setGlobalLang] = useState('py');
  const [expandedId, setExpandedId] = useState(null);
  
  // Load local state
  useEffect(() => {
    const savedCompleted = localStorage.getItem('dsa_completed');
    const savedCustom = localStorage.getItem('dsa_custom');
    if (savedCompleted) setCompletedItems(JSON.parse(savedCompleted));
    if (savedCustom) setCustomCodes(JSON.parse(savedCustom));
  }, []);

  // Save local state
  const toggleCompleted = (id) => {
    const next = { ...completedItems, [id]: !completedItems[id] };
    setCompletedItems(next);
    localStorage.setItem('dsa_completed', JSON.stringify(next));
  };

  const handleCustomCodeChange = (id, val) => {
    const next = { ...customCodes, [id]: val };
    setCustomCodes(next);
    localStorage.setItem('dsa_custom', JSON.stringify(next));
  };

  const progressPercentage = Math.round((Object.values(completedItems).filter(Boolean).length / questionsData.length) * 100);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      
      {/* Sticky Header / Progress bar */}
      <header className="sticky top-0 z-50 bg-slate-800 border-b border-slate-700 shadow-lg px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <Terminal className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">DSA 50+ Challenge</h1>
            <p className="text-xs text-slate-400">Infosys & General Interview Prep</p>
          </div>
        </div>

        <div className="flex-1 max-w-md w-full mx-4">
          <div className="flex justify-between text-sm mb-1 font-medium">
            <span className="text-slate-300">Your Progress</span>
            <span className="text-blue-400">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          <span className="text-sm text-slate-400">Global Lang:</span>
          <select 
            value={globalLang} 
            onChange={(e) => setGlobalLang(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none text-sm cursor-pointer"
          >
            <option value="py">Python</option>
            <option value="c">C / C++</option>
          </select>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto p-4 sm:p-6 pb-24">
        <div className="flex flex-col gap-3">
          {questionsData.map((q) => {
            const isDone = completedItems[q.id];
            const isExpanded = expandedId === q.id;

            return (
              <QuestionItem
                key={q.id}
                q={q}
                isDone={isDone}
                isExpanded={isExpanded}
                globalLang={globalLang}
                customCode={customCodes[q.id] || ''}
                onToggleDone={() => toggleCompleted(q.id)}
                onToggleExpand={() => setExpandedId(isExpanded ? null : q.id)}
                onCodeChange={(val) => handleCustomCodeChange(q.id, val)}
              />
            );
          })}
        </div>
      </main>

    </div>
  );
}

// Sub-component for each question accordion
function QuestionItem({ q, isDone, isExpanded, globalLang, customCode, onToggleDone, onToggleExpand, onCodeChange }) {
  const [viewMode, setViewMode] = useState('ref'); // 'ref' or 'custom'
  const [localLang, setLocalLang] = useState(globalLang);

  // Sync local language with global if global changes, unless user specifically changes it here
  useEffect(() => { setLocalLang(globalLang); }, [globalLang]);

  return (
    <div className={`rounded-xl border transition-all duration-200 ${isExpanded ? 'bg-slate-800 border-slate-600 shadow-xl' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'}`}>
      
      {/* Header Row */}
      <div 
        className="flex items-center gap-4 p-4 cursor-pointer select-none"
        onClick={onToggleExpand}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleDone(); }}
          className={`flex-shrink-0 transition-colors ${isDone ? 'text-green-500' : 'text-slate-500 hover:text-slate-400'}`}
        >
          {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>
        
        <div className="flex-1">
          <h3 className={`font-semibold text-base sm:text-lg ${isDone ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
            {q.title}
          </h3>
        </div>
        
        <div className="text-slate-400">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Expanded Body */}
      {isExpanded && (
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 border-t border-slate-700 pt-4 cursor-default">
          <p className="text-slate-300 mb-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 shadow-inner">
            {q.desc}
          </p>

          <div className="flex flex-col border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('ref')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === 'ref' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
                >
                  <BookOpen className="w-4 h-4" /> Ref Solution
                </button>
                <button 
                  onClick={() => setViewMode('custom')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === 'custom' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
                >
                  <Edit3 className="w-4 h-4" /> My Custom Code
                </button>
              </div>

              {viewMode === 'ref' && (
                <select 
                  value={localLang} 
                  onChange={(e) => setLocalLang(e.target.value)}
                  className="bg-slate-900 border border-slate-600 text-slate-300 rounded px-2 py-1 text-sm focus:outline-none"
                >
                  <option value="py">Python</option>
                  <option value="c">C</option>
                </select>
              )}
            </div>

            {/* Editor Body */}
            <div className="p-4 bg-[#0d1117] relative group">
              {viewMode === 'ref' ? (
                <pre className="text-sm font-mono text-slate-300 overflow-x-auto custom-scrollbar">
                  <code>{localLang === 'py' ? q.py : q.c}</code>
                </pre>
              ) : (
                <textarea
                  className="w-full h-48 bg-transparent text-slate-300 font-mono text-sm resize-y focus:outline-none placeholder-slate-600"
                  placeholder="Write your own custom logic here... Auto-saves to your browser!"
                  value={customCode}
                  onChange={(e) => onCodeChange(e.target.value)}
                  spellCheck={false}
                />
              )}
              {viewMode === 'ref' && (
                <button 
                   className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                   title="Copy Code"
                   onClick={() => navigator.clipboard.writeText(localLang === 'py' ? q.py : q.c)}
                >
                  <Code2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
