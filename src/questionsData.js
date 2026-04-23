export const questionsData = [
  { id: 1, cat: "Arrays", title: "1. Find Largest Element", desc: "Find the maximum element in an array.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n], max=0;\n    for(int i=0;i<n;i++) { scanf("%d",&arr[i]); if(arr[i]>max) max=arr[i]; }\n    printf("Largest: %d\\n", max);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nprint("Largest:", max(arr))` },

  { id: 2, cat: "Arrays", title: "2. Reverse Array", desc: "Reverse the given array in-place.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    for(int i=0,j=n-1;i<j;i++,j--){ int t=arr[i];arr[i]=arr[j];arr[j]=t; }\n    for(int i=0;i<n;i++) printf("%d ",arr[i]);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nprint("Reversed:", arr[::-1])` },

  { id: 3, cat: "Arrays", title: "3. Second Largest Element", desc: "Find the second largest element in an array.",
    c: `#include <stdio.h>\n#include <limits.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int first=INT_MIN,second=INT_MIN;\n    for(int i=0;i<n;i++){\n        if(arr[i]>first){second=first;first=arr[i];}\n        else if(arr[i]>second&&arr[i]!=first) second=arr[i];\n    }\n    printf("Second Largest: %d\\n",second);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nuniq = sorted(set(arr))\nprint("Second Largest:", uniq[-2] if len(uniq)>=2 else "N/A")` },

  { id: 4, cat: "Arrays", title: "4. Missing Number", desc: "Find the missing number in an array of 1 to n+1.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; int total=(n+1)*(n+2)/2;\n    for(int i=0;i<n;i++){scanf("%d",&arr[i]); total-=arr[i];}\n    printf("Missing: %d\\n",total);\n    return 0;\n}`,
    py: `n = int(input("Enter array size: "))\narr = list(map(int, input("Enter elements: ").split()))\nprint("Missing:", (n+1)*(n+2)//2 - sum(arr))` },

  { id: 5, cat: "Arrays", title: "5. Two Sum", desc: "Find two indices that sum to target.",
    c: `#include <stdio.h>\nint main() {\n    int n,target; scanf("%d%d",&n,&target);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    for(int i=0;i<n;i++) for(int j=i+1;j<n;j++)\n        if(arr[i]+arr[j]==target) printf("Indices: %d %d\\n",i,j);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\ntarget = int(input("Enter target: "))\nseen = {}\nfor i, num in enumerate(arr):\n    if target - num in seen:\n        print("Indices:", seen[target-num], i)\n        break\n    seen[num] = i` },

  { id: 6, cat: "Arrays", title: "6. Kadane's Algorithm", desc: "Find the maximum contiguous subarray sum.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int max=arr[0],curr=arr[0];\n    for(int i=1;i<n;i++){\n        curr=arr[i]>curr+arr[i]?arr[i]:curr+arr[i];\n        if(curr>max) max=curr;\n    }\n    printf("Max sum: %d\\n",max);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nmax_so_far = curr = arr[0]\nfor x in arr[1:]:\n    curr = max(x, curr+x)\n    max_so_far = max(max_so_far, curr)\nprint("Max subarray sum:", max_so_far)` },

  { id: 7, cat: "Arrays", title: "7. Move Zeroes", desc: "Move all 0's to the end while maintaining order.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int count=0;\n    for(int i=0;i<n;i++) if(arr[i]!=0) arr[count++]=arr[i];\n    while(count<n) arr[count++]=0;\n    for(int i=0;i<n;i++) printf("%d ",arr[i]);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nresult = [x for x in arr if x!=0] + [0]*arr.count(0)\nprint("Result:", result)` },

  { id: 8, cat: "Arrays", title: "8. Remove Duplicates", desc: "Remove duplicates from a sorted array.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int j=0;\n    for(int i=0;i<n-1;i++) if(arr[i]!=arr[i+1]) arr[j++]=arr[i];\n    arr[j++]=arr[n-1];\n    for(int i=0;i<j;i++) printf("%d ",arr[i]);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter sorted elements: ").split()))\nresult = sorted(set(arr))\nprint("After removing duplicates:", result)` },

  { id: 9, cat: "Arrays", title: "9. Find Duplicate Number", desc: "Find the duplicate number using Floyd's cycle.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int slow=arr[0],fast=arr[0];\n    do{slow=arr[slow];fast=arr[arr[fast]];}while(slow!=fast);\n    slow=arr[0];\n    while(slow!=fast){slow=arr[slow];fast=arr[fast];}\n    printf("Duplicate: %d\\n",slow);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\nnums = list(map(int, input("Enter elements: ").split()))\nseen = set()\nfor x in nums:\n    if x in seen:\n        print("Duplicate:", x)\n        break\n    seen.add(x)` },

  { id: 10, cat: "Arrays", title: "10. Leaders in Array", desc: "Print elements greater than all to their right.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int max=arr[n-1]; printf("%d ",max);\n    for(int i=n-2;i>=0;i--) if(arr[i]>=max){max=arr[i];printf("%d ",max);}\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nmax_r = arr[-1]\nleaders = [max_r]\nfor i in range(len(arr)-2,-1,-1):\n    if arr[i]>=max_r:\n        max_r=arr[i]\n        leaders.append(max_r)\nprint("Leaders:", leaders[::-1])` },

  { id: 11, cat: "Strings", title: "11. Palindrome String", desc: "Check if a string is a palindrome.",
    c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[100]; scanf("%s",s);\n    int l=0,h=strlen(s)-1,ok=1;\n    while(l<h) if(s[l++]!=s[h--]){ok=0;break;}\n    printf(ok?"Palindrome\\n":"Not Palindrome\\n");\n    return 0;\n}`,
    py: `s = input("Enter a string: ")\nprint("Palindrome" if s == s[::-1] else "Not Palindrome")` },

  { id: 12, cat: "Strings", title: "12. Reverse String", desc: "Reverse a string.",
    c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[100]; scanf("%s",s);\n    int n=strlen(s);\n    for(int i=0,j=n-1;i<j;i++,j--){char t=s[i];s[i]=s[j];s[j]=t;}\n    printf("Reversed: %s\\n",s);\n    return 0;\n}`,
    py: `s = input("Enter a string: ")\nprint("Reversed:", s[::-1])` },

  { id: 13, cat: "Strings", title: "13. Count Vowels", desc: "Count the number of vowels in a string.",
    c: `#include <stdio.h>\n#include <ctype.h>\nint main() {\n    char s[100]; scanf("%s",s);\n    int count=0;\n    for(int i=0;s[i];i++){char c=tolower(s[i]);if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u')count++;}\n    printf("Vowels: %d\\n",count);\n    return 0;\n}`,
    py: `s = input("Enter a string: ")\ncount = sum(1 for c in s if c.lower() in 'aeiou')\nprint("Vowels:", count)` },

  { id: 14, cat: "Strings", title: "14. Valid Anagram", desc: "Check if two strings are anagrams.",
    c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s1[100],s2[100]; scanf("%s%s",s1,s2);\n    int cnt[256]={0};\n    if(strlen(s1)!=strlen(s2)){printf("Not Anagram\\n");return 0;}\n    for(int i=0;s1[i];i++){cnt[s1[i]]++;cnt[s2[i]]--;}\n    for(int i=0;i<256;i++) if(cnt[i]){printf("Not Anagram\\n");return 0;}\n    printf("Anagram\\n");\n    return 0;\n}`,
    py: `s1 = input("Enter first string: ")\ns2 = input("Enter second string: ")\nprint("Anagram" if sorted(s1)==sorted(s2) else "Not Anagram")` },

  { id: 15, cat: "Strings", title: "15. First Unique Character", desc: "Find the first non-repeating character.",
    c: `#include <stdio.h>\nint main() {\n    char s[100]; scanf("%s",s);\n    int cnt[256]={0};\n    for(int i=0;s[i];i++) cnt[s[i]]++;\n    for(int i=0;s[i];i++) if(cnt[s[i]]==1){printf("First Unique: %c\\n",s[i]);return 0;}\n    printf("None\\n");\n    return 0;\n}`,
    py: `s = input("Enter a string: ")\nfrom collections import Counter\ncnt = Counter(s)\nresult = next((c for c in s if cnt[c]==1), None)\nprint("First Unique:", result if result else "None")` },

  { id: 16, cat: "Strings", title: "16. Longest Common Prefix", desc: "Find the longest common prefix among strings.",
    c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    int n; scanf("%d",&n);\n    char strs[n][100];\n    for(int i=0;i<n;i++) scanf("%s",strs[i]);\n    char res[100]; strcpy(res,strs[0]);\n    for(int i=1;i<n;i++){\n        int j=0; while(res[j]&&strs[i][j]&&res[j]==strs[i][j]) j++;\n        res[j]='\\0';\n    }\n    printf("Prefix: %s\\n",res);\n    return 0;\n}`,
    py: `n = int(input("Enter number of strings: "))\nstrs = [input(f"String {i+1}: ") for i in range(n)]\nprefix = strs[0]\nfor s in strs[1:]:\n    while not s.startswith(prefix): prefix = prefix[:-1]\nprint("Common Prefix:", prefix if prefix else "None")` },

  { id: 17, cat: "Strings", title: "17. String to Integer (atoi)", desc: "Convert a string to an integer.",
    c: `#include <stdio.h>\nint main() {\n    char s[50]; scanf("%s",s);\n    int res=0,sign=1,i=0;\n    while(s[i]==' ') i++;\n    if(s[i]=='-'||s[i]=='+') sign=1-2*(s[i++]=='-');\n    while(s[i]>='0'&&s[i]<='9') res=res*10+(s[i++]-'0');\n    printf("Integer: %d\\n",res*sign);\n    return 0;\n}`,
    py: `s = input("Enter a string: ").strip()\nsign = -1 if s.startswith('-') else 1\ns2 = s.lstrip('+-')\nresult = 0\nfor c in s2:\n    if not c.isdigit(): break\n    result = result*10 + int(c)\nprint("Integer:", sign*result)` },

  { id: 18, cat: "Strings", title: "18. Valid Parentheses", desc: "Check if brackets are balanced.",
    c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[100]; scanf("%s",s);\n    char stack[100]; int top=-1,ok=1;\n    for(int i=0;s[i];i++){\n        if(s[i]=='('||s[i]=='{'||s[i]=='[') stack[++top]=s[i];\n        else{\n            if(top<0){ok=0;break;}\n            char c=stack[top--];\n            if((s[i]==')'&&c!='(')||(s[i]=='}'&&c!='{')||(s[i]==']'&&c!='[')) {ok=0;break;}\n        }\n    }\n    if(top!=-1) ok=0;\n    printf(ok?"Valid\\n":"Invalid\\n");\n    return 0;\n}`,
    py: `s = input("Enter bracket string: ")\nstack = []\nmap_ = {')':'(','}':'{',']':'['}\nfor c in s:\n    if c in map_:\n        if not stack or stack[-1]!=map_[c]:\n            print("Invalid"); break\n        stack.pop()\n    else:\n        stack.append(c)\nelse:\n    print("Valid" if not stack else "Invalid")` },

  { id: 19, cat: "Strings", title: "19. Count Words", desc: "Count the number of words in a string.",
    c: `#include <stdio.h>\nint main() {\n    char s[200]; fgets(s,200,stdin);\n    int cnt=0,inW=0;\n    for(int i=0;s[i];i++){\n        if(s[i]==' '||s[i]=='\\n') inW=0;\n        else if(!inW){inW=1;cnt++;}\n    }\n    printf("Words: %d\\n",cnt);\n    return 0;\n}`,
    py: `s = input("Enter a sentence: ")\nprint("Word count:", len(s.split()))` },

  { id: 20, cat: "Strings", title: "20. Length of Last Word", desc: "Return the length of the last word.",
    c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[200]; fgets(s,200,stdin);\n    int len=0,i=strlen(s)-1;\n    while(i>=0&&(s[i]==' '||s[i]=='\\n')) i--;\n    while(i>=0&&s[i]!=' '){len++;i--;}\n    printf("Length: %d\\n",len);\n    return 0;\n}`,
    py: `s = input("Enter a sentence: ")\nwords = s.split()\nprint("Last word length:", len(words[-1]) if words else 0)` },

  { id: 21, cat: "Math", title: "21. Prime Number", desc: "Check if a given number is prime.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int ok=n>1;\n    for(int i=2;i*i<=n&&ok;i++) if(n%i==0) ok=0;\n    printf(ok?"Prime\\n":"Not Prime\\n");\n    return 0;\n}`,
    py: `n = int(input("Enter a number: "))\nif n <= 1:\n    print("Not Prime")\nelse:\n    prime = all(n%i!=0 for i in range(2,int(n**0.5)+1))\n    print("Prime" if prime else "Not Prime")` },

  { id: 22, cat: "Math", title: "22. Fibonacci Sequence", desc: "Print the nth Fibonacci number.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    long long a=0,b=1,c;\n    if(n==0){printf("0\\n");return 0;}\n    for(int i=2;i<=n;i++){c=a+b;a=b;b=c;}\n    printf("Fibonacci(%d) = %lld\\n",n,b);\n    return 0;\n}`,
    py: `n = int(input("Enter n: "))\na, b = 0, 1\nfor _ in range(n): a, b = b, a+b\nprint(f"Fibonacci({n}) =", a)` },

  { id: 23, cat: "Math", title: "23. Factorial", desc: "Calculate the factorial of a number.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    long long fact=1;\n    for(int i=1;i<=n;i++) fact*=i;\n    printf("%d! = %lld\\n",n,fact);\n    return 0;\n}`,
    py: `n = int(input("Enter a number: "))\nresult = 1\nfor i in range(1, n+1): result *= i\nprint(f"{n}! =", result)` },

  { id: 24, cat: "Math", title: "24. Armstrong Number", desc: "Check if a number is an Armstrong number.",
    c: `#include <stdio.h>\n#include <math.h>\nint main() {\n    int n; scanf("%d",&n);\n    int t=n,sum=0,digits=0;\n    while(t){digits++;t/=10;} t=n;\n    while(t){sum+=pow(t%10,digits);t/=10;}\n    printf(sum==n?"Armstrong\\n":"Not Armstrong\\n");\n    return 0;\n}`,
    py: `n = int(input("Enter a number: "))\nd = len(str(n))\nprint("Armstrong" if n==sum(int(c)**d for c in str(n)) else "Not Armstrong")` },

  { id: 25, cat: "Math", title: "25. Sum of Digits", desc: "Calculate the sum of digits of a number.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int sum=0;\n    while(n>0){sum+=n%10;n/=10;}\n    printf("Sum: %d\\n",sum);\n    return 0;\n}`,
    py: `n = input("Enter a number: ")\nprint("Sum of digits:", sum(int(c) for c in n if c.isdigit()))` },
];
