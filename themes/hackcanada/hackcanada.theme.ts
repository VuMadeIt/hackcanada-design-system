// The hackcanada theme. `astryx experimental theme editor` wrote this file once and never changes it again.
// The checked settings live in hackcanada.settings.json and the generated hackcanada.settings.ts;
// change them with `astryx experimental theme editor set hackcanada ...`. Add your own changes below: they win over the settings.
import {defineTheme} from '@astryxdesign/core/theme';
import {hackcanadaSettings} from './hackcanada.settings';

export const hackcanadaTheme = defineTheme({
  extends: hackcanadaSettings,
  name: 'hackcanada',
});
