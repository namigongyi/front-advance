#括号

<Primary> :: = <Number> | "(" <Additive> ")"

#乘除

<Mutiplicative> :: = <Primary> | <Primary> '*' <Mutiplicative> |<Primary> "/"<Mutiplicative>

#加减

<Additive> :: = <Mutiplicative> | <Mutiplicative> '+' <Additive> |<Mutiplicative> "-"<Additive>



#都需要加括号

<Primary> :: = <Number> | "(" <Additive> ")"

<Mutiplicative>::= <Primary> | "(" <Primary> "*"  <Mutiplicative> ")" | "(" <Primary> "/"  <Mutiplicative> ")" 

<Additive> :: = <Mutiplicative> | "("<Mutiplicative> '+' <Additive> ")" | "("<Mutiplicative> "-"<Additive> ")"

