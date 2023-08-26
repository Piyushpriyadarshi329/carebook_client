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
    <Menu style={{borderRadius: 20}}>
      <MenuTrigger>{children}</MenuTrigger>

      <MenuOptions optionsContainerStyle={{borderRadius: 10}}>
        {options.map(o => (
          <MenuOption
            style={{padding: 15, paddingHorizontal: 20, borderRadius: 20}}
            onSelect={o.onPress}>
            {o.item}
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default MenuOptionsComponent;
