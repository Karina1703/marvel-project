import './charInfo.scss';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import MarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';

const CharInfo = (props) => {


    const [char, setChar] = useState(null);


    const { loading, error , getCharacter, clearError } = MarvelService();


    useEffect(() => {
        updateChar()
    }, [props.charId])


    const onCharacterLoaded = (res) => {
        setChar(res)
    }


    const updateChar = async () => {
        clearError();
        const { charId } = props;
        if (!charId) return


        const res = await getCharacter(charId);
        onCharacterLoaded(res)

    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">

            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({ char }) => {

    const { name, desciption, thumbnail, homepage, wiki, comics } = char;


    return (

        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{ objectFit: /image_not_available/.test(thumbnail) ? 'contain' : 'cover' }} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {desciption}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {comics.length === 0 ? 'there is no comics' : null}

                {comics.map((item, i) => {
                    if (i > 9) return
                    return (
                        < li className="char__comics-item" key={i} >
                            {item.resourceURI}
                        </li>)
                })}

            </ul>
        </>
    )

}

export default CharInfo;