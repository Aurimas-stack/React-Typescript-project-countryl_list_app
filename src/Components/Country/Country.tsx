import './Country.css'

import { DataProvider } from '../Utils/types';



export interface CountryProps {
    data: DataProvider,
    changeAreaUnits: (e: React.MouseEvent, name:string) => void,
    miles: string[],

}

export const Country: React.FC<CountryProps> = (props): JSX.Element => {
    
    return (
        <div className="country">
            <div className='flag-container'>
                <img className='flag' src={props.data.flag} alt='flag' />
            </div>
            <div className='country-info'>
                <p className='info'><span className='info-name'>Country: </span>{props.data.name}</p>
                <p className='info'><span className='info-name'>Region: </span>{props.data.region}</p>
                <p className='info'><span className='info-name'>Area: </span>{props.data.area}
                <button  className='area-btn'onClick={(e) => props.changeAreaUnits(e, props.data.name)}>{props.miles.includes(props.data.name) ? ' miles²' : ' km²'}</button></p>
            </div>
        </div>
    ) 
}