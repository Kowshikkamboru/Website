import { questionsData as q1to25 } from './questionsData.js';

export const questionsDataPart2 = [
  { id: 26, cat: "Math", title: "26. Power of a Number", desc: "Calculate x raised to the power n.",
    c: `#include <stdio.h>\nint main() {\n    double x; int n; scanf("%lf%d",&x,&n);\n    double res=1; for(int i=0;i<n;i++) res*=x;\n    printf("Result: %.2f\\n",res);\n    return 0;\n}`,
    py: `x = float(input("Enter base x: "))\nn = int(input("Enter exponent n: "))\nprint(f"{x}^{n} =", x**n)` },

  { id: 27, cat: "Math", title: "27. Spy Number", desc: "Check if sum of digits equals product of digits.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int t=n,s=0,p=1;\n    while(t){int d=t%10;s+=d;p*=d;t/=10;}\n    printf(s==p?"Spy Number\\n":"Not Spy Number\\n");\n    return 0;\n}`,
    py: `import math\nn = int(input("Enter a number: "))\ndigits = [int(d) for d in str(n)]\nprint("Spy Number" if sum(digits)==math.prod(digits) else "Not Spy Number")` },

  { id: 28, cat: "Math", title: "28. Palindrome Number", desc: "Check if an integer reads the same forward and backward.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int rev=0,t=n;\n    while(t>0){rev=rev*10+t%10;t/=10;}\n    printf(n==rev?"Palindrome\\n":"Not Palindrome\\n");\n    return 0;\n}`,
    py: `n = input("Enter a number: ")\nprint("Palindrome" if n==n[::-1] else "Not Palindrome")` },

  { id: 29, cat: "Math", title: "29. Count Digits", desc: "Count the total number of digits in an integer.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int cnt=0; if(n==0) cnt=1;\n    while(n!=0){n/=10;cnt++;}\n    printf("Digits: %d\\n",cnt);\n    return 0;\n}`,
    py: `n = input("Enter a number: ")\nprint("Digit count:", len(n.strip('-')))` },

  { id: 30, cat: "Math", title: "30. Equilibrium Index", desc: "Find index where left sum equals right sum.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; int total=0,left=0;\n    for(int i=0;i<n;i++){scanf("%d",&arr[i]);total+=arr[i];}\n    for(int i=0;i<n;i++){\n        total-=arr[i];\n        if(left==total){printf("Equilibrium Index: %d\\n",i);return 0;}\n        left+=arr[i];\n    }\n    printf("No Equilibrium\\n");\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\ntotal = sum(arr); left = 0\nfor i, x in enumerate(arr):\n    total -= x\n    if left == total:\n        print("Equilibrium Index:", i); break\n    left += x\nelse:\n    print("No Equilibrium")` },

  { id: 31, cat: "Searching & Sorting", title: "31. Linear Search", desc: "Search for an element linearly.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int key; scanf("%d",&key);\n    int res=-1;\n    for(int i=0;i<n;i++) if(arr[i]==key){res=i;break;}\n    printf(res>=0?"Found at index: %d\\n":"Not Found\\n",res);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nkey = int(input("Enter search key: "))\nresult = next((i for i,x in enumerate(arr) if x==key), -1)\nprint(f"Found at index: {result}" if result>=0 else "Not Found")` },

  { id: 32, cat: "Searching & Sorting", title: "32. Binary Search", desc: "Search a sorted array using binary search.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int key; scanf("%d",&key);\n    int l=0,r=n-1,res=-1;\n    while(l<=r){int mid=l+(r-l)/2;if(arr[mid]==key){res=mid;break;}else if(arr[mid]<key)l=mid+1;else r=mid-1;}\n    printf(res>=0?"Found at: %d\\n":"Not Found\\n",res);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter sorted elements: ").split()))\nkey = int(input("Enter key to search: "))\nl,r = 0,len(arr)-1\nresult = -1\nwhile l<=r:\n    mid=(l+r)//2\n    if arr[mid]==key: result=mid; break\n    elif arr[mid]<key: l=mid+1\n    else: r=mid-1\nprint(f"Found at index: {result}" if result>=0 else "Not Found")` },

  { id: 33, cat: "Searching & Sorting", title: "33. Bubble Sort", desc: "Sort an array using Bubble Sort.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    for(int i=0;i<n-1;i++) for(int j=0;j<n-i-1;j++) if(arr[j]>arr[j+1]){int t=arr[j];arr[j]=arr[j+1];arr[j+1]=t;}\n    for(int i=0;i<n;i++) printf("%d ",arr[i]);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nfor i in range(n):\n    for j in range(n-i-1):\n        if arr[j]>arr[j+1]: arr[j],arr[j+1]=arr[j+1],arr[j]\nprint("Sorted:", arr)` },

  { id: 34, cat: "Searching & Sorting", title: "34. Selection Sort", desc: "Sort an array using Selection Sort.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    for(int i=0;i<n-1;i++){\n        int m=i; for(int j=i+1;j<n;j++) if(arr[j]<arr[m]) m=j;\n        int t=arr[m];arr[m]=arr[i];arr[i]=t;\n    }\n    for(int i=0;i<n;i++) printf("%d ",arr[i]);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nfor i in range(n):\n    m = min(range(i,n), key=lambda j:arr[j])\n    arr[i],arr[m] = arr[m],arr[i]\nprint("Sorted:", arr)` },

  { id: 35, cat: "Searching & Sorting", title: "35. Insertion Sort", desc: "Sort an array using Insertion Sort.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    for(int i=1;i<n;i++){\n        int key=arr[i],j=i-1;\n        while(j>=0&&arr[j]>key){arr[j+1]=arr[j];j--;}\n        arr[j+1]=key;\n    }\n    for(int i=0;i<n;i++) printf("%d ",arr[i]);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nfor i in range(1,n):\n    key=arr[i]; j=i-1\n    while j>=0 and arr[j]>key: arr[j+1]=arr[j]; j-=1\n    arr[j+1]=key\nprint("Sorted:", arr)` },

  { id: 36, cat: "Searching & Sorting", title: "36. Merge Sorted Arrays", desc: "Merge two sorted arrays.",
    c: `#include <stdio.h>\nint main() {\n    int m,n; scanf("%d%d",&m,&n);\n    int a[m],b[n],c[m+n];\n    for(int i=0;i<m;i++) scanf("%d",&a[i]);\n    for(int i=0;i<n;i++) scanf("%d",&b[i]);\n    int i=0,j=0,k=0;\n    while(i<m&&j<n) c[k++]=a[i]<b[j]?a[i++]:b[j++];\n    while(i<m) c[k++]=a[i++]; while(j<n) c[k++]=b[j++];\n    for(int x=0;x<m+n;x++) printf("%d ",c[x]);\n    return 0;\n}`,
    py: `m = int(input("Size of first array: "))\na = list(map(int, input("Enter first array: ").split()))\nn = int(input("Size of second array: "))\nb = list(map(int, input("Enter second array: ").split()))\nprint("Merged:", sorted(a+b))` },

  { id: 37, cat: "Searching & Sorting", title: "37. Search Insert Position", desc: "Find index or insert position of target.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int t; scanf("%d",&t);\n    int l=0,r=n-1,ans=n;\n    while(l<=r){int mid=l+(r-l)/2;if(arr[mid]>=t){ans=mid;r=mid-1;}else l=mid+1;}\n    printf("Index: %d\\n",ans);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter sorted elements: ").split()))\nt = int(input("Enter target: "))\nl,r = 0,n-1\nwhile l<=r:\n    mid=(l+r)//2\n    if arr[mid]==t: print("Index:",mid); exit()\n    elif arr[mid]<t: l=mid+1\n    else: r=mid-1\nprint("Insert at index:", l)` },

  { id: 38, cat: "Searching & Sorting", title: "38. Majority Element", desc: "Find the element appearing more than n/2 times.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n]; for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    int cnt=0,cand=0;\n    for(int i=0;i<n;i++){if(cnt==0)cand=arr[i];cnt+=arr[i]==cand?1:-1;}\n    printf("Majority: %d\\n",cand);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\ncnt, cand = 0, None\nfor x in arr:\n    if cnt==0: cand=x\n    cnt += 1 if x==cand else -1\nprint("Majority Element:", cand)` },

  { id: 39, cat: "Searching & Sorting", title: "39. Count Frequency", desc: "Count frequencies of elements.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n],vis[n];\n    for(int i=0;i<n;i++){scanf("%d",&arr[i]);vis[i]=0;}\n    for(int i=0;i<n;i++){\n        if(vis[i]) continue;\n        int cnt=1;\n        for(int j=i+1;j<n;j++) if(arr[i]==arr[j]){vis[j]=1;cnt++;}\n        printf("%d: %d\\n",arr[i],cnt);\n    }\n    return 0;\n}`,
    py: `from collections import Counter\nn = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\nfor k,v in Counter(arr).items(): print(f"{k}: {v}")` },

  { id: 40, cat: "Searching & Sorting", title: "40. Best Time to Buy & Sell Stock", desc: "Find maximum profit from stock prices.",
    c: `#include <stdio.h>\n#include <limits.h>\nint main() {\n    int n; scanf("%d",&n);\n    int p[n]; for(int i=0;i<n;i++) scanf("%d",&p[i]);\n    int minP=INT_MAX,maxPr=0;\n    for(int i=0;i<n;i++){\n        if(p[i]<minP) minP=p[i];\n        else if(p[i]-minP>maxPr) maxPr=p[i]-minP;\n    }\n    printf("Max Profit: %d\\n",maxPr);\n    return 0;\n}`,
    py: `n = int(input("Enter number of days: "))\nprices = list(map(int, input("Enter prices: ").split()))\nmin_p = float('inf'); max_pr = 0\nfor p in prices:\n    min_p = min(min_p, p)\n    max_pr = max(max_pr, p-min_p)\nprint("Max Profit:", max_pr)` },

  { id: 41, cat: "Advanced", title: "41. Container With Most Water", desc: "Find two lines that store the most water.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int h[n]; for(int i=0;i<n;i++) scanf("%d",&h[i]);\n    int l=0,r=n-1,mx=0;\n    while(l<r){\n        int area=(h[l]<h[r]?h[l]:h[r])*(r-l);\n        if(area>mx) mx=area;\n        if(h[l]<h[r]) l++; else r--;\n    }\n    printf("Max Area: %d\\n",mx);\n    return 0;\n}`,
    py: `n = int(input("Enter number of heights: "))\nh = list(map(int, input("Enter heights: ").split()))\nl,r,mx = 0,n-1,0\nwhile l<r:\n    mx = max(mx, min(h[l],h[r])*(r-l))\n    if h[l]<h[r]: l+=1\n    else: r-=1\nprint("Max Area:", mx)` },

  { id: 42, cat: "Advanced", title: "42. Longest Increasing Subsequence", desc: "Find the length of LIS.",
    c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d",&n);\n    int arr[n],lis[n],mx=0;\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    for(int i=0;i<n;i++) lis[i]=1;\n    for(int i=1;i<n;i++) for(int j=0;j<i;j++) if(arr[i]>arr[j]&&lis[i]<lis[j]+1) lis[i]=lis[j]+1;\n    for(int i=0;i<n;i++) if(lis[i]>mx) mx=lis[i];\n    printf("LIS Length: %d\\n",mx);\n    return 0;\n}`,
    py: `n = int(input("Enter number of elements: "))\narr = list(map(int, input("Enter elements: ").split()))\ndp = [1]*n\nfor i in range(1,n):\n    for j in range(i):\n        if arr[i]>arr[j]: dp[i]=max(dp[i],dp[j]+1)\nprint("LIS Length:", max(dp))` },

  { id: 43, cat: "Advanced", title: "43. Word Break", desc: "Check if string can be segmented into dictionary words.",
    c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[]="leetcode";\n    char *dict[]={"leet","code"};\n    int dp[9]={0}; dp[0]=1;\n    for(int i=1;i<=8;i++) for(int j=0;j<i;j++) if(dp[j]){\n        char sub[10]; strncpy(sub,s+j,i-j); sub[i-j]='\\0';\n        for(int k=0;k<2;k++) if(strcmp(sub,dict[k])==0) dp[i]=1;\n    }\n    printf(dp[8]?"True\\n":"False\\n");\n    return 0;\n}`,
    py: `s = input("Enter the string: ")\nn = int(input("Number of dictionary words: "))\nwords = set(input("Enter words (space-separated): ").split())\ndp = [False]*(len(s)+1); dp[0]=True\nfor i in range(1,len(s)+1):\n    for j in range(i):\n        if dp[j] and s[j:i] in words: dp[i]=True; break\nprint("Can break:", dp[-1])` },

  { id: 44, cat: "Advanced", title: "44. Decode Ways", desc: "Count total combinations to decode a numeric string.",
    c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[50]; scanf("%s",s);\n    int n=strlen(s),dp[51]={0};\n    dp[0]=1; dp[1]=s[0]!='0'?1:0;\n    for(int i=2;i<=n;i++){\n        if(s[i-1]!='0') dp[i]+=dp[i-1];\n        int two=(s[i-2]-'0')*10+(s[i-1]-'0');\n        if(two>=10&&two<=26) dp[i]+=dp[i-2];\n    }\n    printf("Ways: %d\\n",dp[n]);\n    return 0;\n}`,
    py: `s = input("Enter numeric string: ")\nif not s or s[0]=='0': print("Ways: 0")\nelse:\n    prev,curr=1,1\n    for i in range(1,len(s)):\n        temp=curr\n        if s[i]=='0': curr=0\n        if s[i-1]=='1' or (s[i-1]=='2' and s[i]<='6'): curr+=prev\n        prev=temp\n    print("Ways:", curr)` },

  { id: 45, cat: "Advanced", title: "45. Tower of Hanoi", desc: "Solve the Tower of Hanoi puzzle.",
    c: `#include <stdio.h>\nvoid hanoi(int n,char f,char t,char a){\n    if(n==0) return;\n    hanoi(n-1,f,a,t);\n    printf("Move %d: %c -> %c\\n",n,f,t);\n    hanoi(n-1,a,t,f);\n}\nint main(){\n    int n; scanf("%d",&n);\n    hanoi(n,'A','C','B');\n    return 0;\n}`,
    py: `n = int(input("Enter number of disks: "))\ndef hanoi(n,src,dst,aux):\n    if n>0:\n        hanoi(n-1,src,aux,dst)\n        print(f"Move disk {n}: {src} -> {dst}")\n        hanoi(n-1,aux,dst,src)\nhanoi(n,'A','C','B')` },

  { id: 46, cat: "Patterns", title: "46. Right Triangle Pattern", desc: "Print a right-angled triangle of stars.",
    c: `#include <stdio.h>\nint main(){\n    int n; scanf("%d",&n);\n    for(int i=1;i<=n;i++){for(int j=1;j<=i;j++) printf("*");printf("\\n");}\n    return 0;\n}`,
    py: `n = int(input("Enter number of rows: "))\nfor i in range(1, n+1): print('*'*i)` },

  { id: 47, cat: "Patterns", title: "47. Pyramid Pattern", desc: "Print a centered pyramid of stars.",
    c: `#include <stdio.h>\nint main(){\n    int n; scanf("%d",&n);\n    for(int i=1;i<=n;i++){for(int j=i;j<n;j++) printf(" ");for(int k=1;k<=(2*i-1);k++) printf("*");printf("\\n");}\n    return 0;\n}`,
    py: `n = int(input("Enter number of rows: "))\nfor i in range(1,n+1): print(' '*(n-i)+'*'*(2*i-1))` },

  { id: 48, cat: "Advanced", title: "48. Climbing Stairs", desc: "Count distinct ways to climb n stairs.",
    c: `#include <stdio.h>\nint main(){\n    int n; scanf("%d",&n);\n    int a=1,b=1,c;\n    for(int i=2;i<=n;i++){c=a+b;a=b;b=c;}\n    printf("Ways: %d\\n",b);\n    return 0;\n}`,
    py: `n = int(input("Enter number of stairs: "))\na,b=1,1\nfor _ in range(n-1): a,b=b,a+b\nprint("Distinct ways:", b)` },

  { id: 49, cat: "Advanced", title: "49. Coin Change", desc: "Find minimum coins to make an amount.",
    c: `#include <stdio.h>\n#define MIN(a,b) ((a)<(b)?(a):(b))\nint main(){\n    int m,amount; scanf("%d%d",&m,&amount);\n    int coins[m]; for(int i=0;i<m;i++) scanf("%d",&coins[i]);\n    int dp[amount+1];\n    for(int i=0;i<=amount;i++) dp[i]=99999; dp[0]=0;\n    for(int i=1;i<=amount;i++) for(int j=0;j<m;j++) if(coins[j]<=i) dp[i]=MIN(dp[i],dp[i-coins[j]]+1);\n    printf("Min coins: %d\\n",dp[amount]>amount?-1:dp[amount]);\n    return 0;\n}`,
    py: `m = int(input("Number of coin types: "))\ncoins = list(map(int, input("Enter coin values: ").split()))\namount = int(input("Enter target amount: "))\ndp = [float('inf')]*(amount+1); dp[0]=0\nfor c in coins:\n    for x in range(c,amount+1): dp[x]=min(dp[x],dp[x-c]+1)\nprint("Min coins:", dp[amount] if dp[amount]!=float('inf') else -1)` },

  { id: 50, cat: "Advanced", title: "50. Pascal's Triangle", desc: "Print the first N rows of Pascal's triangle.",
    c: `#include <stdio.h>\nint main(){\n    int n; scanf("%d",&n);\n    for(int i=0;i<n;i++){int v=1;for(int j=0;j<=i;j++){printf("%d ",v);v=v*(i-j)/(j+1);}printf("\\n");}\n    return 0;\n}`,
    py: `n = int(input("Enter number of rows: "))\ntriangle=[]\nfor i in range(n):\n    row=[1]*(i+1)\n    for j in range(1,i): row[j]=triangle[i-1][j-1]+triangle[i-1][j]\n    triangle.append(row)\n    print(row)` },
];

import { newQuestions1 } from './questionsNew1.js';
import { newQuestions2 } from './questionsNew2.js';

export const allQuestions = [...q1to25, ...questionsDataPart2, ...newQuestions1, ...newQuestions2];
