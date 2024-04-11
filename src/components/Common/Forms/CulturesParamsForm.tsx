import React, {useState} from 'react';
import style from "./formsStyle.module.css"
import {RegularEditableSpan} from "../RgularEditinebalSpan/RegularEditableSpan";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import SelectComponent from "../SelectComponent/Select";
import {useColors} from "../../General_agronomist/hooks/useFields";

const culturesDictionary  = {
    "1":"Кукуруза",
    "2":"Ячмень яровой",
    "3":"Ячмень озимый",
    "4":"Подсолнух",
    "5":"Люцерна",
    "6":"Рапс",
    "7":"Бововна",
    "8":"Картофель",
    "9":"Овес",
    "10":"Гречка",
    "11":"Горчица",
    "12":"Буряк сахоррнный",
    "13":"Буряк красный",
    "15":"Морковь",
    "16":"Лен",
    "17":"Віковес",
    "18":"Конопля",
    "19":"Соя",
    "20":"Просо",
    "21":"Горох",


}
const plantVarieties = {
    "1": "Агрессор",
    "2": "Вымпел",
    "3": "Никита",
    "4": "Альфа",
    "5": "Бета",
    "6": "Гамма",
    "7": "Дельта",
    "8": "Эпсилон",
    "9": "Зета",
    "10": "Иота",
    "11": "Каппа",
    "12": "Лямбда",
    "13": "Мю",
    "14": "Ню",
    "15": "Кси",
    "16": "Омикрон",
    "17": "Пи",
    "18": "Ро",
    "19": "Сигма",
    "20": "Тау",
    "21": "Чета",
    "22": "Йота",
    "23": "Микро",
    "24": "Титан",
    "25": "Орион",
    "26": "Дельфин",
    "27": "Аквилон",
    "28": "Тритон",
    "29": "Центавр",
    "30": "Аполлон",
    // Добавьте еще реальных названий, если необходимо
};
console.log(plantVarieties);

type CultureFieldPropsType ={
    cultureName:string
    sqere:string
    varietyOfCultureName:string
    color:string

}
type cultureParamsPropsType = {
    setCultuteParam:(name:string,sqere:number,collor:string, variantyName:string)=>void

}

const CulturesParamsForm:React.FC<cultureParamsPropsType> = ({setCultuteParam}) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const {cultureColors,setColor,remoweColor} = useColors()
    const[plaseholder,setPlaseholder] = useState(
        {
                sqere:"Введите S ",
                culture:"Введите название",
                varietyOfCultureName:"Введите название",
        },
    );
    const {handleSubmit, control, formState,reset} = useForm<CultureFieldPropsType>();

    const onSubmit: SubmitHandler<CultureFieldPropsType> = (data) => {
        console.log("submit")
        console.log(data);
        setIsOpen(!isOpen);
        setPlaseholder({
            sqere:"Введите S ",
            culture:"Введите название",
            varietyOfCultureName:"Введите название",})
        reset({sqere:"",cultureName:"",varietyOfCultureName:""})
        setCultuteParam(data.cultureName, +data.sqere, data.color, data.varietyOfCultureName);
    };

    console.log(formState);

    return (
        <form  onSubmit={handleSubmit(onSubmit)} action={""} style={{backgroundColor:"#0f1526",borderBottomRightRadius:25,borderTopRightRadius:25 , padding:15}}>
            <header>
                Добавить культуру <input type={"checkbox"} checked={isOpen} onClick={()=>setIsOpen(!isOpen)}/>
                {isOpen&&<button disabled={!formState.isValid} type={"submit"} style={{marginLeft:125,backgroundColor:"#00041f",color:"#3aff02",boxShadow:formState.isValid? "#3aff02 0px 1px 8px 6px" : "rgb(255 6 6) 0px 1px 8px 6px"}}>+</button>}
            </header>
            <div className={`${style.cultureParamsFieldContainer} ${isOpen?style.containerOpen:""}`}>
              <span className={style.cultureParamsFieldItem}> Название -
                  <Controller
                      rules={{required:"Введите Название"}}
                      name="cultureName"
                      control={control}
                      render={({field:{onChange}}) =>
                          <RegularEditableSpan
                              hash={culturesDictionary}
                              placeholder={plaseholder.culture}
                              lang={"ru"}
                              type={"text"}
                              onChange={(newValue)=>{
                                  onChange(newValue);
                                  setPlaseholder({...plaseholder,culture: newValue ? newValue:"Введите название"})
                              }}
                          />
                      }
                  />
              </span>
                <span className={style.cultureParamsFieldItem}> Площадь - <span className={style.sgere}>
                     <Controller
                         rules={{required:"Введите площадь"}}
                         name="sqere"
                         control={control}
                         render={({field:{onChange}}) =>
                             <RegularEditableSpan
                                 placeholder={plaseholder.sqere}
                                 type={"number"}
                                 onChange={(newValue)=>{
                                     onChange(newValue);
                                     setPlaseholder({...plaseholder,sqere: newValue ? newValue:"Введите площадь"})
                                 }}
                             />}
                     />
                </span></span>

                <span className={style.cultureParamsFieldItem}> Сорт-
               <Controller
                   rules={{required:"Введите Название"}}
                   name="varietyOfCultureName"
                   control={control}
                   render={({field:{onChange}}) =>
                       <RegularEditableSpan
                           lang={"ru"}
                           hash={plantVarieties}
                           placeholder={plaseholder.varietyOfCultureName}
                           type={"text"}
                           onChange={(newValue)=>{
                               onChange(newValue);
                               setPlaseholder({...plaseholder,varietyOfCultureName: newValue ? newValue:"Введите название"})
                           }}
                       />}
               />
              </span>
              <span className={style.cultureParamsFieldItem}> Цвет -
                  <Controller
                      rules={{required:"Введите цвет"}}
                      control={control}
                      name={"color"}
                      render={({field:{onChange}})=>
                          <SelectComponent
                              onSelect={(newValue)=>{
                                  console.log("select",newValue)
                                onChange(newValue)
                              }}
                              name={"выбрать"}
                              options={cultureColors}
                          />}
                      />
              </span>
            </div>
        </form>
    );
};
export default CulturesParamsForm;