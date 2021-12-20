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
    changeAreaUnits: (e: React.MouseEvent, name:string) => void,
    miles: string[],
    nameShuffle: string,
    shuffleByOrder: () => void,
    bysize:string,
    shuffleBySize: () => void,
    bySpecificCountry: string,
    setbySpecificCountry: (e: string) => void,
    shuffleBySpecificCountry: () => void,
    region: string,
    setRegion: (e: any) => void,
    shuffleByRegion: () => void
}

export const Countries:React.FC<Props> = (props) => {
    return (
        <div className='country-container'>
            {
                props.data.length > 0 ? 
                <div className='btn-container'>
                    <div className='button-name'>
                        <h3>Shuffle countries by alphabet</h3>
                        <button className='btn'onClick={props.shuffleByOrder}>{props.nameShuffle}</button>
                    </div>
                    <div className='button-name'>
                        <h3>Shuffle countries by region</h3>
                        <select defaultValue={"DEFAULT"} onChange={(e) => props.setRegion(e.target.value)}>
                            <option value={"DEFAULT"} disabled>Pick a region</option>
                            <option value={"Asia"}>Asia</option>
                            <option value={"Europe"}>Europe</option>
                            <option value={"Africa"}>Africa</option>
                            <option value={"Americas"}>Americas</option>
                            <option value={"Oceania"}>Oceania</option>
                            <option value={"Polar"}>Polar</option>
                        </select>
                        <button className='btn' onClick={props.shuffleByRegion}>Filter</button> 
                    </div>
                    <div className='button-name area-countries'>
                            <div>
                                <h3>Find countries that smaller than:</h3>
                                <input id="country-name" value={props.bySpecificCountry} onChange={(e) => props.setbySpecificCountry(e.target.value)}/>
                                <button className='btn' onClick={props.shuffleBySpecificCountry}>By Specific country</button>
                            </div>
                            <button className='btn' onClick={props.shuffleBySize}>{props.bysize}</button>  
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
                        changeAreaUnits={props.changeAreaUnits}
                        miles={props.miles}/>
                    </>
                ) : null
            }
        </div>
    )
}