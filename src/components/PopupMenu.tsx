import * as React from 'react';
import {View, Pressable} from 'react-native';
import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';

const PopupMenu = ({
  options,
  anchor,
}: {
  options: {label: string; onPress: () => void}[];
  anchor: JSX.Element;
}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View
        style={{
          backgroundColor: 'green',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchorPosition="bottom"
          anchor={<Button onPress={openMenu}>{anchor}</Button>}>
          {options.map(o => (
            <Menu.Item
              onPress={() => {
                o.onPress();
                closeMenu();
              }}
              title={o.label}
            />
          ))}
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default PopupMenu;
