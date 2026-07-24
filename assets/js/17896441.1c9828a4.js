"use strict";(self.webpackChunkvisualize_code=self.webpackChunkvisualize_code||[]).push([["106"],{5118(e,t,n){n.d(t,{o:()=>c});let i=[{id:"course_dsa",slug:"dsa",title:"DSA",description:"C\u1EA5u tr\xfac d\u1EEF li\u1EC7u v\xe0 gi\u1EA3i thu\u1EADt v\u1EDBi m\xf4 ph\u1ECFng tr\u1EF1c quan.",icon:"DS",order:1,isPublished:!0}],o=[{id:"section_dsa_dynamic_programming",courseId:"course_dsa",slug:"dynamic-programming",title:"Dynamic Programming",order:2,isPublished:!0}],a=[{id:"lesson_dsa_fibonacci_bottom_up",slug:"fibonacci",courseId:"course_dsa",sectionId:"section_dsa_dynamic_programming",order:1,difficulty:"beginner",estimatedTime:25,tags:["dsa","dynamic-programming","fibonacci","bottom-up"],canonicalPath:"/courses/dsa/fibonacci",isPublished:!0}],s=[{id:"translation_dsa_fibonacci_bottom_up_vi",lessonId:"lesson_dsa_fibonacci_bottom_up",language:"vi",title:"Fibonacci Bottom-up",description:"H\u1ECDc c\xe1ch gi\u1EA3i b\xe0i Fibonacci b\u1EB1ng quy ho\u1EA1ch \u0111\u1ED9ng bottom-up.",learningObjectives:["Hi\u1EC3u \xfd t\u01B0\u1EDFng quy ho\u1EA1ch \u0111\u1ED9ng bottom-up qua b\xe0i Fibonacci.","Bi\u1EBFt c\xe1ch x\xe2y b\u1EA3ng gi\xe1 tr\u1ECB t\u1EEB b\xe0i to\xe1n nh\u1ECF \u0111\u1EBFn b\xe0i to\xe1n l\u1EDBn.","Vi\u1EBFt \u0111\u01B0\u1EE3c code Fibonacci bottom-up b\u1EB1ng C++ v\xe0 Python.","Ph\xe2n t\xedch \u0111\u01B0\u1EE3c \u0111\u1ED9 ph\u1EE9c t\u1EA1p th\u1EDDi gian v\xe0 b\u1ED9 nh\u1EDB c\u1EE7a l\u1EDDi gi\u1EA3i."],prerequisites:["Bi\u1EBFt kh\xe1i ni\u1EC7m bi\u1EBFn v\xe0 v\xf2ng l\u1EB7p.","Hi\u1EC3u m\u1EA3ng/list \u1EDF m\u1EE9c c\u01A1 b\u1EA3n.","Bi\u1EBFt \u0111\u1ECBnh ngh\u0129a d\xe3y Fibonacci."],theoryBlocks:[{id:"definition",type:"paragraph",content:"D\xe3y Fibonacci \u0111\u01B0\u1EE3c \u0111\u1ECBnh ngh\u0129a nh\u01B0 sau:"},{id:"formula",type:"list",items:["`F(0) = 0`","`F(1) = 1`","`F(n) = F(n - 1) + F(n - 2)` v\u1EDBi `n >= 2`"]},{id:"bottom-up-idea",type:"paragraph",content:"C\xe1ch bottom-up b\u1EAFt \u0111\u1EA7u t\u1EEB hai gi\xe1 tr\u1ECB nh\u1ECF nh\u1EA5t, sau \u0111\xf3 x\xe2y d\u1EA7n c\xe1c k\u1EBFt qu\u1EA3 l\u1EDBn h\u01A1n. Thay v\xec g\u1ECDi \u0111\u1EC7 quy nhi\u1EC1u l\u1EA7n, ta l\u01B0u l\u1EA1i k\u1EBFt qu\u1EA3 \u0111\xe3 t\xednh v\xe0 d\xf9ng ch\xfang \u0111\u1EC3 t\xednh b\u01B0\u1EDBc ti\u1EBFp theo."},{id:"example-intro",type:"paragraph",content:"V\u1EDBi `n = 6`, ta t\xednh l\u1EA7n l\u01B0\u1EE3t:"},{id:"sequence",type:"code",language:"text",code:`F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8`},{id:"state-transition",type:"paragraph",content:"\xdd t\u01B0\u1EDFng quan tr\u1ECDng: m\u1ED7i tr\u1EA1ng th\xe1i `F(i)` ch\u1EC9 ph\u1EE5 thu\u1ED9c v\xe0o hai tr\u1EA1ng th\xe1i tr\u01B0\u1EDBc \u0111\xf3 l\xe0 `F(i - 1)` v\xe0 `F(i - 2)`."}],visualization:{type:"placeholder",title:"B\u1EA3ng tr\u1EA1ng th\xe1i Fibonacci"},codeExamples:[{id:"cpp",language:"cpp",title:"C++",code:`#include <iostream>
#include <vector>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }

    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

int main() {
    cout << fibonacci(6);
    return 0;
}`},{id:"python",language:"python",title:"Python",code:`def fibonacci(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


print(fibonacci(6))`}],programOutput:{type:"text",value:"8"},complexity:{time:"O(n)",space:"O(n)",explanation:"Ta duy\u1EC7t t\u1EEB `2` \u0111\u1EBFn `n`, n\xean th\u1EDDi gian l\xe0 `O(n)`. M\u1EA3ng `dp` c\xf3 `n + 1` ph\u1EA7n t\u1EED, n\xean b\u1ED9 nh\u1EDB l\xe0 `O(n)`."},commonMistakes:["Qu\xean x\u1EED l\xfd tr\u01B0\u1EDDng h\u1EE3p `n = 0` ho\u1EB7c `n = 1`.","T\u1EA1o m\u1EA3ng `dp` kh\xf4ng \u0111\u1EE7 k\xedch th\u01B0\u1EDBc.","D\xf9ng l\u1EA1i c\xf4ng th\u1EE9c \u0111\u1EC7 quy nh\u01B0ng kh\xf4ng l\u01B0u k\u1EBFt qu\u1EA3, khi\u1EBFn th\u1EDDi gian t\u0103ng r\u1EA5t nhanh.","Nh\u1EA7m th\u1EE9 t\u1EF1 c\u1EADp nh\u1EADt khi t\u1ED1i \u01B0u b\u1ED9 nh\u1EDB xu\u1ED1ng `O(1)`."],exercises:["T\xednh `F(10)` b\u1EB1ng b\u1EA3ng bottom-up v\xe0 ghi l\u1EA1i t\u1EEBng gi\xe1 tr\u1ECB.","S\u1EEDa code \u0111\u1EC3 ch\u1EC9 d\xf9ng hai bi\u1EBFn thay v\xec m\u1EA3ng `dp`.","Vi\u1EBFt h\xe0m tr\u1EA3 v\u1EC1 to\xe0n b\u1ED9 d\xe3y Fibonacci t\u1EEB `F(0)` \u0111\u1EBFn `F(n)`."],quiz:{type:"placeholder",questions:[]},summary:["Bottom-up l\xe0 c\xe1ch gi\u1EA3i t\u1EEB b\xe0i to\xe1n nh\u1ECF l\xean b\xe0i to\xe1n l\u1EDBn. V\u1EDBi Fibonacci, ta b\u1EAFt \u0111\u1EA7u t\u1EEB `F(0)` v\xe0 `F(1)`, sau \u0111\xf3 t\xednh t\u1EEBng gi\xe1 tr\u1ECB ti\u1EBFp theo b\u1EB1ng c\xf4ng th\u1EE9c `F(i) = F(i - 1) + F(i - 2)`.","C\xe1ch n\xe0y tr\xe1nh vi\u1EC7c t\xednh l\u1EB7p l\u1EA1i nh\u01B0 \u0111\u1EC7 quy thu\u1EA7n v\xe0 l\xe0 v\xed d\u1EE5 nh\u1EADp m\xf4n t\u1ED1t cho Quy ho\u1EA1ch \u0111\u1ED9ng."]},{id:"translation_dsa_fibonacci_bottom_up_en",lessonId:"lesson_dsa_fibonacci_bottom_up",language:"en",title:"Fibonacci Bottom-up",description:"Learn how to solve Fibonacci with bottom-up dynamic programming.",learningObjectives:["Understand bottom-up dynamic programming through Fibonacci.","Build values from smaller subproblems to larger ones.","Write bottom-up Fibonacci code in C++ and Python.","Analyze the time and space complexity of the solution."],prerequisites:["Know variables and loops.","Understand arrays/lists at a basic level.","Know the definition of the Fibonacci sequence."],theoryBlocks:[{id:"definition",type:"paragraph",content:"The Fibonacci sequence is defined as:"},{id:"formula",type:"list",items:["`F(0) = 0`","`F(1) = 1`","`F(n) = F(n - 1) + F(n - 2)` where `n >= 2`"]},{id:"bottom-up-idea",type:"paragraph",content:"The bottom-up approach starts from the smallest values, then builds larger results step by step. Instead of calling recursion repeatedly, we store computed results and reuse them for the next state."},{id:"example-intro",type:"paragraph",content:"For `n = 6`, we compute:"},{id:"sequence",type:"code",language:"text",code:`F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8`},{id:"state-transition",type:"paragraph",content:"The key idea: each state `F(i)` depends only on the two previous states, `F(i - 1)` and `F(i - 2)`."}],visualization:{type:"placeholder",title:"Fibonacci State Table"},codeExamples:[{id:"cpp",language:"cpp",title:"C++",code:`#include <iostream>
#include <vector>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }

    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

int main() {
    cout << fibonacci(6);
    return 0;
}`},{id:"python",language:"python",title:"Python",code:`def fibonacci(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


print(fibonacci(6))`}],programOutput:{type:"text",value:"8"},complexity:{time:"O(n)",space:"O(n)",explanation:"We iterate from `2` to `n`, so the time complexity is `O(n)`. The `dp` array has `n + 1` elements, so the space complexity is `O(n)`."},commonMistakes:["Forgetting to handle `n = 0` or `n = 1`.","Creating a `dp` array that is too small.","Using the recursive formula without memoization, causing the runtime to grow very quickly.","Updating variables in the wrong order when optimizing memory to `O(1)`."],exercises:["Compute `F(10)` with a bottom-up table and write down every value.","Change the code to use only two variables instead of a `dp` array.","Write a function that returns the full Fibonacci sequence from `F(0)` to `F(n)`."],quiz:{type:"placeholder",questions:[]},summary:["Bottom-up solves the problem from small cases to larger cases. For Fibonacci, we start with `F(0)` and `F(1)`, then compute each next value with `F(i) = F(i - 1) + F(i - 2)`.","This avoids repeated work from plain recursion and is a good first example of Dynamic Programming."]}],r=[{id:"learning-objectives",type:"learningObjectives",title:{vi:"M\u1EE5c ti\xeau h\u1ECDc t\u1EADp",en:"Learning Objectives"},getContent:e=>e.learningObjectives},{id:"prerequisites",type:"prerequisites",title:{vi:"Ki\u1EBFn th\u1EE9c c\u1EA7n c\xf3",en:"Prerequisites"},getContent:e=>e.prerequisites},{id:"lesson-video",type:"lessonVideo",title:{vi:"Video b\xe0i h\u1ECDc",en:"Lesson Video"},getContent:(e,t)=>e.video??t.video},{id:"theory",type:"theory",title:{vi:"L\xfd thuy\u1EBFt",en:"Theory"},getContent:e=>e.theoryBlocks},{id:"visualization",type:"visualization",title:{vi:"Tr\u1EF1c quan h\xf3a",en:"Visualization"},getContent:e=>e.visualization},{id:"code-example",type:"codeExamples",title:{vi:"V\xed d\u1EE5 code",en:"Code Example"},getContent:e=>e.codeExamples},{id:"program-output",type:"programOutput",title:{vi:"K\u1EBFt qu\u1EA3 ch\u01B0\u01A1ng tr\xecnh",en:"Program Output"},getContent:e=>e.programOutput},{id:"complexity",type:"complexity",title:{vi:"\u0110\u1ED9 ph\u1EE9c t\u1EA1p",en:"Complexity"},getContent:e=>e.complexity},{id:"common-mistakes",type:"commonMistakes",title:{vi:"L\u1ED7i th\u01B0\u1EDDng g\u1EB7p",en:"Common Mistakes"},getContent:e=>e.commonMistakes},{id:"quiz",type:"quiz",title:{vi:"Quiz",en:"Quiz"},getContent:e=>e.quiz},{id:"practice",type:"practice",title:{vi:"Luy\u1EC7n t\u1EADp",en:"Practice"},getContent:e=>e.exercises},{id:"summary",type:"summary",title:{vi:"T\xf3m t\u1EAFt",en:"Summary"},getContent:e=>e.summary}],c={getLessonById:e=>a.find(t=>t.id===e),getLessonByPath(e,t){let n=i.find(t=>t.slug===e);if(n)return a.find(e=>e.courseId===n.id&&e.slug===t)},getLessonTranslation:(e,t)=>s.find(n=>n.lessonId===e&&n.language===t)??s.find(t=>t.lessonId===e&&"vi"===t.language),getLessonPageData({lessonId:e,language:t}){let n=this.getLessonById(e);if(!n)return;let a=i.find(e=>e.id===n.courseId),s=o.find(e=>e.id===n.sectionId),c=this.getLessonTranslation(n.id,t);return{course:a,section:s,lesson:n,translation:c,sections:function({lesson:e,translation:t,language:n}){return t?r.map(i=>({id:i.id,type:i.type,title:i.title[n]??i.title.vi,content:i.getContent(t,e)})):[]}({lesson:n,translation:c,language:t})}},getLessonToc({lessonId:e,language:t}){let n=this.getLessonPageData({lessonId:e,language:t});return n?.sections.map(e=>({id:e.id,value:e.title,level:2}))??[]}}},7613(e,t,n){function i(e,t){"u">typeof window&&window.localStorage.setItem(e,JSON.stringify(t))}n.d(t,{L:()=>a});let o="visualize-code:learning-progress",a={getProgress:()=>(function(e,t){if("u"<typeof window)return t;try{let n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}})(o,{}),recordLessonVisit({courseId:e,lessonId:t,path:n}){let a=this.getProgress(),s={...a,activeCourseId:e,activeLessonId:t,lastLessons:{...a.lastLessons??{},[e]:n},updatedAt:new Date().toISOString()};return i(o,s),s},recordHeading(e,t){let n=this.getProgress(),a={...n,lastHeadings:{...n.lastHeadings??{},[e]:t},updatedAt:new Date().toISOString()};return i(o,a),a}}},2497(e,t,n){n.d(t,{A:()=>B});var i=n(4848),o=n(6540),a=n(4164),s=n(3741),r=n(6550),c=n(6343),l=n(5886),d=n(5587),u=n(8463),p=n(8287),h=n(2292),g=n(1260),m=n(5118);function b(e,t,n,i){if(t.lessonId){let e=m.o.getLessonToc({lessonId:t.lessonId,language:i});if(e.length>0)return e}return(t.lessonToc?.length>0?t.lessonToc:e).map(e=>({...e,value:e.valueKey?n(e.valueKey,e.value):e.value}))}function y(){let{toc:e,frontMatter:t}=(0,r.u)(),{language:n,t:o}=(0,g.ok)();return(0,i.jsx)(h.A,{toc:b(e,t,o,n),minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,a.A)(p.G.docs.docTocMobile,"tocMobile_bxCs")})}var v=n(3242);function f(){let{toc:e,frontMatter:t}=(0,r.u)(),{language:n,t:o}=(0,g.ok)();return(0,i.jsx)(v.A,{toc:b(e,t,o,n),minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:p.G.docs.docTocDesktop})}var x=n(2405),F=n(8260),_=n(9209),w=n(6347),j=n(5310),C=n(568),k=n(74),q=n(3013);function I({children:e,href:t,isLast:n}){let o="breadcrumbs__link";return n?(0,i.jsx)("span",{className:o,children:e}):t?(0,i.jsx)(j.A,{className:o,href:t,children:(0,i.jsx)("span",{children:e})}):(0,i.jsx)("span",{className:o,children:e})}function L({children:e,active:t}){return(0,i.jsx)("li",{className:(0,a.A)("breadcrumbs__item",{"breadcrumbs__item--active":t}),children:e})}function A(){var e,t;let n=(0,F.OF)(),o=(0,_.Dt)(),s=(0,w.zy)(),r=(0,g.Bd)();if(!n)return null;let c=(e=n,t=s.pathname,!q.DH.find(e=>t.includes(`/courses/${e.slug}`))||e.some(e=>"Courses"===e.label)?e:[{type:"category",label:"Courses",href:"/courses"},...e]).map(e=>({...e,label:"Courses"===e.label?r("courses.all"):r(`sidebar.${e.label}`,e.label)}));return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(k.A,{breadcrumbs:c}),(0,i.jsx)("nav",{className:(0,a.A)(p.G.docs.docBreadcrumbs),"aria-label":(0,C.T)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,i.jsxs)("ul",{className:"breadcrumbs",children:[o&&(0,i.jsx)(L,{active:!1,children:(0,i.jsx)(I,{href:o.path,isLast:!1,children:r("nav.home")})}),c.map((e,t)=>{let n=t===c.length-1,o="category"===e.type&&e.linkUnlisted?void 0:e.href;return(0,i.jsx)(L,{active:n,children:(0,i.jsx)(I,{href:o,isLast:n,children:e.label})},`${e.label}-${t}`)})]})})]})}var O=n(7502),T=n(7613);function z(){let e=(0,w.zy)(),{toc:t,frontMatter:n}=(0,r.u)(),i=b(t,n,(e,t)=>t??e);return(0,o.useEffect)(()=>{if("u"<typeof window||0===i.length)return;let t=T.L.getProgress(),n=t.lastHeadings?.[e.pathname];!e.hash&&n&&window.requestAnimationFrame(()=>{document.getElementById(n)?.scrollIntoView()})},[e.pathname]),(0,o.useEffect)(()=>{if("u"<typeof window||0===i.length)return;let t=i.map(e=>document.getElementById(e.id)).filter(Boolean);if(0===t.length)return;let n=new IntersectionObserver(t=>{let n=t.filter(e=>e.isIntersecting).sort((e,t)=>e.boundingClientRect.top-t.boundingClientRect.top)[0];n&&T.L.recordHeading(e.pathname,n.target.id)},{rootMargin:"-20% 0px -65% 0px",threshold:[0,1]});return t.forEach(e=>n.observe(e)),()=>n.disconnect()},[e.pathname,i]),null}function B({children:e}){let t=function(){let{frontMatter:e,toc:t}=(0,r.u)(),n=(0,s.l)(),o=e.hide_table_of_contents,a=!o&&(!!e.lessonId||t.length>0||e.lessonToc?.length>0);return{hidden:o,mobile:a?(0,i.jsx)(y,{}):void 0,desktop:a&&("desktop"===n||"ssr"===n)?(0,i.jsx)(f,{}):void 0}}(),{metadata:n}=(0,r.u)();return(0,i.jsxs)("div",{className:"row",children:[(0,i.jsxs)("div",{className:(0,a.A)("col",!t.hidden&&"docItemCol_z5aJ"),children:[(0,i.jsx)(O.A,{metadata:n}),(0,i.jsx)(l.A,{}),(0,i.jsxs)("div",{className:"docItemContainer_c0TR",children:[(0,i.jsxs)("article",{children:[(0,i.jsx)(z,{}),(0,i.jsx)(A,{}),(0,i.jsx)(d.A,{}),t.mobile,(0,i.jsx)(x.A,{children:e}),(0,i.jsx)(u.A,{})]}),(0,i.jsx)(c.A,{})]})]}),t.desktop&&(0,i.jsx)("div",{className:"col col--3",children:t.desktop})]})}},3711(e,t,n){n.d(t,{A:()=>r});var i=n(4848);n(6540);var o=n(4164),a=n(7174),s=n(1260);function r(e){let{className:t,previous:n,next:r}=e,c=(0,s.Bd)();return(0,i.jsxs)("nav",{className:(0,o.A)(t,"pagination-nav"),"aria-label":"Docs pages",children:[n&&(0,i.jsx)(a.A,{...n,title:c(`sidebar.${n.title}`,n.title),subLabel:c("pagination.previous")}),r&&(0,i.jsx)(a.A,{...r,title:c(`sidebar.${r.title}`,r.title),subLabel:c("pagination.next"),isNext:!0})]})}}}]);