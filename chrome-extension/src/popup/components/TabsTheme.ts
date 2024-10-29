import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { tabsAnatomy } from '@chakra-ui/anatomy';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
    tab: {
        fontWeight: 'semibold',
    },
    tabpanel: {
        fontFamily: 'mono',
    },
});

const sizes = {
    xl: definePartsStyle({
        tab: {
            fontSize: 'xl',
            py: '4',
            px: '6',
        },
        tabpanel: {
            py: '4',
            px: '6',
        },
    }),
};

const colorfulVariant = definePartsStyle(props => {
    const { colorScheme: c } = props; // add colorScheme as a prop

    return {
        tab: {
            border: '1px solid',
            borderColor: 'transparent',
            bg: mode(`${c}.300`, `${c}.300`)(props),
            borderTopRadius: 'lg',
            borderBottom: 'none',
            color: 'white',
            _selected: {
                bg: mode('#fff', '#fff')(props),
                color: mode(`${c}.500`, `${c}.300`)(props),
                borderColor: 'inherit',
                borderBottom: 'none',
                mb: '-2px',
            },
        },
        tablist: {
            borderBottom: '2x solid',
            borderColor: 'inherit',
        },
        tabpanel: {
            border: '2px solid',
            borderColor: 'inherit',
            borderBottomRadius: 'lg',
            bg: mode(`${c}`, `${c}.500`)(props),
            color: `${c}.500`
        },
    };
});

const variants = {
    colorful: colorfulVariant,
};

export const tabsTheme = defineMultiStyleConfig({
    baseStyle,
    sizes,
    variants,
    defaultProps: {
        size: 'xl',
        variant: 'colorful',
        colorScheme: 'green',
    }
});


