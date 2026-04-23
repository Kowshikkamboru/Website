// New questions 51-65 from PDFs (non-duplicate)
export const newQuestions1 = [
  { id: 51, cat: "Arrays", title: "51. Rotate Array by K", desc: "Rotate a list to the right by k positions.",
    c: `#include <stdio.h>\nint main() {\n    int n,k; scanf("%d%d",&n,&k);\n    int a[n]; for(int i=0;i<n;i++) scanf("%d",&a[i]);\n    k=k%n; int t[n];\n    for(int i=0;i<n;i++) t[(i+k)%n]=a[i];\n    for(int i=0;i<n;i++) printf("%d ",t[i]);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nk = int(input("Enter k: "))\nk = k % n\nprint("Rotated:", arr[-k:] + arr[:-k])` },

  { id: 52, cat: "Arrays", title: "52. Intersection of Two Arrays", desc: "Find common elements between two arrays.",
    c: `#include <stdio.h>\nint main() {\n    int n,m; scanf("%d%d",&n,&m);\n    int a[n],b[m]; for(int i=0;i<n;i++) scanf("%d",&a[i]);\n    for(int i=0;i<m;i++) scanf("%d",&b[i]);\n    for(int i=0;i<n;i++) for(int j=0;j<m;j++)\n        if(a[i]==b[j]){printf("%d ",a[i]);b[j]=-1;break;}\n    return 0;\n}`,
    py: `n = int(input("Size of first array: "))\na = list(map(int, input("Enter first array: ").split()))\nm = int(input("Size of second array: "))\nb = list(map(int, input("Enter second array: ").split()))\nprint("Intersection:", list(set(a) & set(b)))` },

  { id: 53, cat: "Arrays", title: "53. Merge Intervals", desc: "Merge overlapping intervals.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int s[n],e[n];\n    for(int i=0;i<n;i++) scanf("%d%d",&s[i],&e[i]);\n    // Simple sort + merge\n    for(int i=0;i<n-1;i++) for(int j=0;j<n-i-1;j++)\n        if(s[j]>s[j+1]){int t=s[j];s[j]=s[j+1];s[j+1]=t;t=e[j];e[j]=e[j+1];e[j+1]=t;}\n    printf("[%d,%d]",s[0],e[0]);\n    int cs=s[0],ce=e[0];\n    for(int i=1;i<n;i++){\n        if(s[i]<=ce){if(e[i]>ce)ce=e[i];}\n        else{cs=s[i];ce=e[i];printf(" [%d,%d]",cs,ce);}\n    }\n    return 0;\n}`,
    py: `n = int(input("Number of intervals: "))\nintervals = []\nfor i in range(n):\n    s, e = map(int, input(f"Interval {i+1} (start end): ").split())\n    intervals.append([s, e])\nintervals.sort()\nmerged = [intervals[0]]\nfor s, e in intervals[1:]:\n    if s <= merged[-1][1]:\n        merged[-1][1] = max(merged[-1][1], e)\n    else:\n        merged.append([s, e])\nprint("Merged:", merged)` },

  { id: 54, cat: "Arrays", title: "54. Check if Array is Sorted", desc: "Check whether the array is sorted in non-decreasing order.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int a[n]; for(int i=0;i<n;i++) scanf("%d",&a[i]);\n    int sorted=1;\n    for(int i=0;i<n-1;i++) if(a[i]>a[i+1]){sorted=0;break;}\n    printf(sorted?"Sorted\\n":"Not Sorted\\n");\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nprint("Sorted" if arr == sorted(arr) else "Not Sorted")` },

  { id: 55, cat: "Arrays", title: "55. Rearrange Alternating Pos/Neg", desc: "Rearrange array in alternating positive and negative numbers.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int a[n]; for(int i=0;i<n;i++) scanf("%d",&a[i]);\n    int pos[n],neg[n],p=0,ng=0;\n    for(int i=0;i<n;i++){if(a[i]>=0)pos[p++]=a[i];else neg[ng++]=a[i];}\n    int i=0,pi=0,ni=0;\n    while(pi<p&&ni<ng){a[i++]=neg[ni++];a[i++]=pos[pi++];}\n    while(pi<p) a[i++]=pos[pi++];\n    while(ni<ng) a[i++]=neg[ni++];\n    for(int j=0;j<n;j++) printf("%d ",a[j]);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\npos = [x for x in arr if x >= 0]\nneg = [x for x in arr if x < 0]\nresult = []\ni = j = 0\nwhile i < len(neg) and j < len(pos):\n    result.extend([neg[i], pos[j]])\n    i += 1; j += 1\nresult.extend(neg[i:])\nresult.extend(pos[j:])\nprint("Rearranged:", result)` },

  { id: 56, cat: "Strings", title: "56. Longest Palindromic Substring", desc: "Find the longest palindromic substring in a string.",
    c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[100]; scanf("%s",s);\n    int n=strlen(s),start=0,maxL=1;\n    for(int i=0;i<n;i++){\n        for(int lo=0;lo<2;lo++){\n            int l=i,r=i+lo;\n            while(l>=0&&r<n&&s[l]==s[r]){if(r-l+1>maxL){start=l;maxL=r-l+1;}l--;r++;}\n        }\n    }\n    for(int i=start;i<start+maxL;i++) printf("%c",s[i]);\n    printf("\\n");\n    return 0;\n}`,
    py: `s = input("Enter a string: ")\ndef longest_palindrome(s):\n    start, max_len = 0, 1\n    for i in range(len(s)):\n        for l, r in [(i, i), (i, i+1)]:\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                if r - l + 1 > max_len:\n                    start, max_len = l, r - l + 1\n                l -= 1; r += 1\n    return s[start:start + max_len]\nprint("Longest Palindrome:", longest_palindrome(s))` },

  { id: 57, cat: "Strings", title: "57. Remove Spaces from String", desc: "Remove all spaces from a string.",
    c: `#include <stdio.h>\nint main() {\n    char s[200]; fgets(s,200,stdin);\n    for(int i=0;s[i];i++) if(s[i]!=' '&&s[i]!='\\n') printf("%c",s[i]);\n    printf("\\n");\n    return 0;\n}`,
    py: `s = input("Enter a string: ")\nprint("Without spaces:", s.replace(" ", ""))` },

  { id: 58, cat: "Strings", title: "58. Convert to Uppercase", desc: "Convert all characters in a string to uppercase without using built-in upper().",
    c: `#include <stdio.h>\nint main() {\n    char s[200]; fgets(s,200,stdin);\n    for(int i=0;s[i];i++) if(s[i]>='a'&&s[i]<='z') s[i]-=32;\n    printf("Uppercase: %s",s);\n    return 0;\n}`,
    py: `s = input("Enter a string: ")\nresult = ''.join(chr(ord(c)-32) if 'a'<=c<='z' else c for c in s)\nprint("Uppercase:", result)` },

  { id: 59, cat: "Math", title: "59. GCD (Euclidean Algorithm)", desc: "Find the Greatest Common Divisor of two numbers.",
    c: `#include <stdio.h>\nint main() {\n    int a,b; scanf("%d%d",&a,&b);\n    while(b){int r=a%b;a=b;b=r;}\n    printf("GCD: %d\\n",a);\n    return 0;\n}`,
    py: `a = int(input("Enter first number: "))\nb = int(input("Enter second number: "))\ndef gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\nprint("GCD:", gcd(a, b))` },

  { id: 60, cat: "Math", title: "60. LCM", desc: "Find the Least Common Multiple of two numbers.",
    c: `#include <stdio.h>\nint gcd(int a,int b){while(b){int r=a%b;a=b;b=r;}return a;}\nint main() {\n    int a,b; scanf("%d%d",&a,&b);\n    printf("LCM: %d\\n",(a*b)/gcd(a,b));\n    return 0;\n}`,
    py: `a = int(input("Enter first number: "))\nb = int(input("Enter second number: "))\ndef gcd(a, b):\n    while b: a, b = b, a % b\n    return a\nprint("LCM:", (a * b) // gcd(a, b))` },

  { id: 61, cat: "Math", title: "61. Perfect Number", desc: "Check if a number equals the sum of its proper divisors.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int sum=1;\n    for(int i=2;i*i<=n;i++) if(n%i==0){sum+=i;if(i!=n/i)sum+=n/i;}\n    printf(sum==n&&n>1?"Perfect\\n":"Not Perfect\\n");\n    return 0;\n}`,
    py: `n = int(input("Enter a number: "))\ndivisor_sum = sum(i for i in range(1, n) if n % i == 0)\nprint("Perfect Number" if divisor_sum == n and n > 1 else "Not Perfect")` },

  { id: 62, cat: "Math", title: "62. Reverse a Number", desc: "Reverse the digits of an integer.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int rev=0,t=n<0?-n:n;\n    while(t>0){rev=rev*10+t%10;t/=10;}\n    printf("Reversed: %d\\n",n<0?-rev:rev);\n    return 0;\n}`,
    py: `n = input("Enter a number: ")\nif n.startswith('-'):\n    print("Reversed:", '-' + n[1:][::-1])\nelse:\n    print("Reversed:", n[::-1])` },

  { id: 63, cat: "Math", title: "63. Even or Odd", desc: "Check if a number is even or odd.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    printf(n%2==0?"Even\\n":"Odd\\n");\n    return 0;\n}`,
    py: `n = int(input("Enter a number: "))\nprint("Even" if n % 2 == 0 else "Odd")` },

  { id: 64, cat: "Math", title: "64. Happy Number", desc: "Check if a number is a happy number (sum of squares of digits eventually reaches 1).",
    c: `#include <stdio.h>\nint sumSq(int n){int s=0;while(n){int d=n%10;s+=d*d;n/=10;}return s;}\nint main() {\n    int n; scanf("%d",&n);\n    int slow=n,fast=sumSq(n);\n    while(fast!=1&&slow!=fast){slow=sumSq(slow);fast=sumSq(sumSq(fast));}\n    printf(fast==1?"Happy\\n":"Not Happy\\n");\n    return 0;\n}`,
    py: `n = int(input("Enter a number: "))\ndef is_happy(n):\n    seen = set()\n    while n != 1 and n not in seen:\n        seen.add(n)\n        n = sum(int(d)**2 for d in str(n))\n    return n == 1\nprint("Happy Number" if is_happy(n) else "Not Happy")` },

  { id: 65, cat: "Math", title: "65. Sum of Natural Numbers", desc: "Calculate sum of first n natural numbers.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    printf("Sum: %d\\n",n*(n+1)/2);\n    return 0;\n}`,
    py: `n = int(input("Enter n: "))\nprint("Sum:", n * (n + 1) // 2)\nprint("(Recursive check:", end=" ")\ndef sum_rec(n): return 0 if n <= 0 else n + sum_rec(n-1)\nprint(sum_rec(n), ")")` },
];
