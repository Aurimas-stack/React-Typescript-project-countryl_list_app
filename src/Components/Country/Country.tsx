import './Country.css'

interface countryProvider {
    flag:string, 
    name: string, 
    region: string, 
    area: number
}

type Props = {
    data: countryProvider,
    getCountry: (e: React.MouseEvent, name:string) => void,
    leaveCountry: () => void,
    changeAreaUnits: () => void,
    miles: string[]
}

export const Country: React.FC<Props> = (props) => {
    return (
        <div className="country" onMouseEnter={(e) => props.getCountry(e, props.data.name)} onMouseLeave={props.leaveCountry}>
            <div className='flag-container'>
                <img className='flag' src={props.data.flag} alt='flag' />
            </div>
            <div className='country-info'>
                <p className='info'><span className='info-name'>Country: </span>{props.data.name}</p>
                <p className='info'><span className='info-name'>Region: </span>{props.data.region}</p>
                <p className='info'><span className='info-name'>Area: </span>{props.data.area}
                <button  className='area-btn'onClick={props.changeAreaUnits}>{props.miles.includes(props.data.name) ? ' m²' : ' km²'}</button></p>
            </div>
        </div>
    )
}