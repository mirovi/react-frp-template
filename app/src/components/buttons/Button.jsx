import className from 'utils/component/className'
import styles from './button.scss'

const c = className(styles)

const Button = ({ children, outlined, round, fullWidth, noPadding, onClick, type = 'button', disabled, alternative, compact, brown, loading }) => (
    <button
        className={c('button', { outlined, round, noPadding, fullWidth, alternative, compact, brown })}
        onClick={onClick}
        type={type}
        disabled={disabled}>
            <div className={c('content')}>
                {children}
            </div>
    </button>
)

export default Button
