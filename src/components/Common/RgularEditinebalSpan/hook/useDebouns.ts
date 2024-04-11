import {useEffect, useState} from 'react'


export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 300)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}
export const configureClueFormative = (formativeData:Array<{[key:string]:string|number|null}>,
                                       field:string,
                                       value:string)=>{
    console.log("formative -->",formativeData,field,value);
    const temp:Array<string> = []
    if(value){
        formativeData && formativeData.forEach((item)=>{
            const currentValue = item[field]  ?? "";
            if(currentValue.toString().toLowerCase().startsWith(value.toLowerCase())) temp.push(currentValue.toString())
        })
    }
    console.log(temp);
    return temp
}

export const  configureClue = (curentValue:string,
                               filteredPool:{[p: string]: string | number |null},
                               ):string[]  => {
    let temp:string[] = [];
    if(curentValue){
        for(let key in filteredPool){
        const currentHashValue = filteredPool[key];
        if(currentHashValue?.toString().toLowerCase().startsWith(curentValue.toLowerCase())) {
            temp.push(currentHashValue.toString());
        }
    }
    }
    console.log(temp)
    return  temp;
}