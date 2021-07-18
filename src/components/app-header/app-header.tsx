import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={`${styles.appNavigation} text_type_main-default`}>
        <li className='mr-2 pt-4 pb-4 pl-5 pr-5'>
          <a className={styles.link} href="#nowhere">
            <i className='mr-2'>
              <BurgerIcon type="primary" />
            </i>
            Конструктор
          </a>
        </li>
        <li className='pt-4 pb-4 pl-5 pr-5 text_color_inactive'>
          <a className={styles.link} href="#nowhere">
            <i className='mr-2'>
            <ListIcon type="secondary" />
            </i>
            Лента заказов
          </a>
        </li>
      </nav>

      <a href="#nowhere">
        <Logo />
      </a>

      <ul className={`${styles.userMenu} text_type_main-default`}>
        <li className='pt-4 pb-4 pl-5 pr-5 text_color_inactive'>
          <a className={styles.link} href="#nowhere">
            <i className='mr-2'>
              <ProfileIcon type="secondary" />
            </i>
            Личный кабинет
          </a>
        </li>
      </ul>

    </header>
  );
}

export default AppHeader;
