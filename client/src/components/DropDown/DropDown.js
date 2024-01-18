import {useRef, useState} from "react";
import Link from "react-router-dom";
import styles from "styles/components/DropDown.module.scss";
import classNames from "classNames";
import useDetectClose from "hooks/useDetectClose";


const DropDown = () => {
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  return (
    <div className={styles.dropDownMenu}>
      <button
        onClick={() => setIsOpen(!isOpen)}
      >
        메뉴 보기
      </button>

      <ul
        ref={dropDownRef}
        className={classNames(styles.menu, { [styles.active]: isOpen })}
      >
        <li>
          <Link href="/mypage">마이페이지</Link>
        </li>
       	{/* 메뉴 리스트들 */}
      </ul>
    </div>
  );
};

export default DropDown;