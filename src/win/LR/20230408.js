
/** 运算优先级
 * ()
 * new call . []
 * ++   --   +   -
 * +  -  /  *
 * **
 *  ! & | >> << >>> ^ , ;
 *  ()    = ^ ; ! & 
 * && ||  =
 *  ? :
 * 
 */

/**
 * Literal 
 * Object
 * Null,Undefind
 * String  Number   Boolean
 * Symbol , BigInt
 * 
 * 'string',"string",`string`,
 * 1,1e9,0b,0x,0o
 * true,false
 * null
 * [],{},正则
 */

/**
 * statement 
 * {},=
 * if   for   while   switch 
 * try   catch   finally
 * yield 
 * with 
 * debugger
 * return
 * await
 * var let const
 */

/**
 * function
 * class 
 * module
 */
/**
 * new 表达式的分析
 * (new Cls)() 
 * new Cls.a().b()  
 * new Cls.a().b().c
 */

/**
 * 产生式
 * <Number> :: = /^((-{0,1}([1-9][0-9]{0,}|0)(\.[0-9]{1,}){0,1})|\.[0-9]{1,})$/
 * <Null> ::= /^null$/
 * <Boolean> ::= /^[true|false]$/
 * <String> ::= /^[']([^'\r\n]*|\\.)[']$ | ^["]([^"\r\n]*|\\.)["]$ /
 

* <Variable> ::= /^[_$A-Za-z][_$A-Za-z0-9]{0,}/
 * 拓展：
 * <Literal>::= <Number> |<Null> |<Boolean> |<String>
 * <Primary> :: = "(" <Expression> ")" | <Literal> | <Variable>
 * <Call> :: = "new" <Primary> "(" ")" | <Primary> "(" ")"
 * <Member> ::=  
 *      <Primary> |
 *      <Member>'.' <Identifier> |
 *      <Primay>'.' <Identifier> |
 *      <Primay>'[' <Expression> ']'
 * <Expression>::=
 * 
 */
//根据以上产生式写出StringLiteral 写出的正则表达式：
///"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"|'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'/, RegularExpressionLiteral:/\/(?:\[(?:\\[\s\S]|[^\]])*\]|[^*\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])(?:\[(?:\\[\s\S]|[^\]])*\]|[^\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])*\/[0-9a-zA-Z]*/
//};

function f (){
    return function a (){
        console.log('aaaa')

            return function b(){
                console.log('bbbb')
            }
    }
}
new f.a().b()