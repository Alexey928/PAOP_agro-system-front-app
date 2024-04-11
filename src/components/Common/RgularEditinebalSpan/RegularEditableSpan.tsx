import React, {KeyboardEvent, ChangeEvent, useState, useEffect, useMemo} from 'react';
import style from "./editinebalSpan.module.css";
import {configureClue, useDebounce} from './hook/useDebouns'
import {detectLanguage} from "./utils"

type EditableSpanPropsType = {
    onChange:(value:string)=>void,
    hash?:{[p: string]: string | number | null}
    widthClue?:boolean
    type:"password"|"text"|"number"
    handler?:(value:string)=>void
    placeholder?:string
    lang?:"ru"|"en"|"es"
}
export function RegularEditableSpan(props:EditableSpanPropsType){
    const [title, setTitle] = useState<string>("");
    const [clue,setClue] = useState<Array<string>>([]);
    const [langError , setLangErr] = useState<string>("");
    const [isTitle , setIsTitle] = useState<boolean>(false);
    const [clueChekTriger, setClueCheckTriger] = useState(0);

    const debouncedValue = useDebounce<string>(title, 500);

    const onKeyPresHandler = ()=>{
        props.handler && title && props.handler(title.toLowerCase());
        props.onChange(title);
        setTitle("");
    }

    const onBlurHandler = ()=>{
        setClueCheckTriger(clueChekTriger+1)
        title && props.onChange(title)
        setTitle("");
    }

    const onClueItemClickHandler = (e: React.MouseEvent<HTMLLIElement>)=>{
        const textContent = e.currentTarget.textContent
        if(textContent){
            setTitle(textContent)
            props.onChange && props.onChange(textContent);
            setClue([])
            setTitle("")
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(props.lang){
            const lang = detectLanguage(e.currentTarget.value);
            lang === props.lang && setTitle(e.currentTarget.value);
            lang==="unknown" && setTitle("")
            lang !== props.lang && setLangErr(props.lang)
            title&&setIsTitle(true);
        }else{
            setTitle(e.currentTarget.value);
        }
    }
    useEffect(()=>{
        if(clueChekTriger){
            const timeOut = setTimeout(()=>{
                setClue([]);
                //setTitle("")
            },220);
            return ()=>clearTimeout(timeOut)
        }
    },[clueChekTriger]);

    useEffect(() => {
           if(props.hash) {
               setClue(configureClue(title,props.hash ?? {}));
           }
    }, [debouncedValue]);

    useEffect(()=>{
        let timeaut: NodeJS.Timeout;
        if(langError){
            console.log("");
            const t: NodeJS.Timeout =  setTimeout(()=>{
                setLangErr("")
            },2000)
            timeaut = t
        }
        return ()=>{clearTimeout(timeaut)};
    },[langError])

    return(
        <div style={{position:"relative"}}>
            {clue.length!==0 && <ul className={style.clue} > {clue.map(e => <li onClick={onClueItemClickHandler}
                                                                                className={style.clueItem}
                                                                                key={e}>{e}</li>)}
                                </ul>}
            <input className={style.input}
                   style={langError&&!isTitle?{color:"red",boxShadow: "0 0 20px 15px rgb(248 77 3)"}:{}}
                   type={props.type}
                   placeholder={props.placeholder?props.placeholder:""}
                   value={title}
                   onChange={changeTitle}
                   onBlur={onBlurHandler}
                   onKeyDown={(e:KeyboardEvent<HTMLInputElement>)=>e.key==="Enter"&&onKeyPresHandler()}
            />
        </div>)

}
