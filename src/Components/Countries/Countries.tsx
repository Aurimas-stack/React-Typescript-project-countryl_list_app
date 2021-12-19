import './Countries.css';
import {Country} from '../Country/Country';
import { Pagination } from '../Pagination/Pagination';

interface dataProvider {
    flag: string,
    name: string,
    region: string,
    area: number
}

type Props = {
    data: Array<dataProvider>,
    getCountry: (e: React.MouseEvent, name:string) => void,
    leaveCountry: () => void,
    changeAreaUnits: () => void,
    miles: string[],
    nameShuffle: string,
    shuffleByOrder: () => void,
    bysize:string,
    shuffleBySize: () => void,
    bySpecificCountry: string,
    setbySpecificCountry: (e: string) => void,
    shuffleBySpecificCountry: () => void
}

export const Countries:React.FC<Props> = (props) => {
    return (
        <div className='country-container'>
            {
                props.data.length > 0 ? 
                <div className='btn-container'>
                    <button onClick={props.shuffleByOrder}>{props.nameShuffle}</button>
                    <button onClick={props.shuffleBySize}>{props.bysize}</button>
                    <div className='specific-country'>
                        <input value={props.bySpecificCountry} onChange={(e) => props.setbySpecificCountry(e.target.value)}/>
                        <button onClick={props.shuffleBySpecificCountry}>By Specifinc country</button>
                    </div>
                </div> : null
            }
            {
                props.data.length > 0 ? (
                    <>
                    <Pagination data={props.data} 
                        RenderComponent={Country} 
                        pageLimit={8} 
                        dataLimit={10}
                        getCountry={props.getCountry}
                        leaveCountry={props.leaveCountry}
                        changeAreaUnits={props.changeAreaUnits}
                        miles={props.miles}/>
                    </>
                ) : null
            }
        </div>
    )
}