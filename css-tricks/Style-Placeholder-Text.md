##Style Placeholder Text

```css
::-webkit-input-placeholder {
   color: red;
}

:-moz-placeholder { /* Firefox 18- */
   color: red;  
}

::-moz-placeholder {  /* Firefox 19+ */
   color: red;  
}

:-ms-input-placeholder {  
   color: red;  
}
```

<small class="text-danger">
Placeholder text in inputs has (in the browsers implementing it so far) a light gray color. To style it, you'll need vendor prefix CSS properties.
</small>

+ [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-placeholder)
+ [MSDN](https://msdn.microsoft.com/library/hh772745(v=vs.85).aspx)