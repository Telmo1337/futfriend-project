import BaseView from "../BaseView";
import SettingItem from "./components/SettingItem";

const Settings = () => (
  <BaseView title="Definições">
    <SettingItem label="Notificações" />
    <SettingItem label="Modo Escuro" />
  </BaseView>
);

export default Settings;
