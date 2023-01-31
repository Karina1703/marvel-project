import './charList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/spinner'
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = MarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])


    const onCharactersLoaded = (newCharList) => {

        let isEnded = false;
        if (newCharList.length < 9) {
            isEnded = true;
        }

        setCharList([...charList, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset + 9)
        setCharEnded(isEnded)
    }


    const onRequest = async (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        const res = await getAllCharacters(offset);
        onCharactersLoaded(res);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (index) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[index].classList.add('char__item_selected');
        itemRefs.current[index].focus();
    }


    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}

            <ul className="char__grid">
                <View characters={charList}
                    onCharSelected={props.onCharSelected}
                    focusOnItem={focusOnItem}
                    itemRefs={itemRefs}
                    containerComponent 

                />
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>)

}


const View = ({ characters, onCharSelected, focusOnItem, itemRefs }) => {
    return (
        <TransitionGroup component={null}>

            {characters.map(({ name, thumbnail, id }, i) => (
                <CSSTransition
                    key={id}
                    timeout={100}
                    classNames="char__item"
                >
                    <li className="char__item"
                        ref={el => itemRefs.current[i] = el}
                        onClick={() => {
                            onCharSelected(id)
                            focusOnItem(i)
                        }
                        }
                        key={id}>
                        <img src={thumbnail} alt={name}
                            style={{ objectFit: /image_not_available/.test(thumbnail) ? 'contain' : 'cover' }} />
                        <div className="char__name">{name}</div>
                    </li>

                </CSSTransition>
            ))}

        </TransitionGroup>
    )
}

export default CharList;