import React from 'react';
import {Text} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const MenuOptionsComponent = ({
  options,
  children,
}: {
  options: {item: JSX.Element; onPress: () => void}[];
  children: JSX.Element;
}) => {
  return (
    <Menu>
      <MenuTrigger>{children}</MenuTrigger>

      <MenuOptions>
        {options.map(o => (
          <MenuOption style={{padding: 5}} onSelect={o.onPress}>
            {o.item}
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default MenuOptionsComponent;
