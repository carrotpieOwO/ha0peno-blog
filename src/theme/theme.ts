import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import "@fontsource/noto-sans-kr/400.css";

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({ config, fonts: {
  body: `'Noto Sans KR', sans-serif`,
} })

export default theme