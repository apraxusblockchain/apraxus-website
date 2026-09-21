"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Check,
  ChevronRight,
  CircleHelp,
  Cpu,
  Eye,
  Gauge,
  Monitor,
  Moon,
  Network,
  RotateCcw,
  Shield,
  Sparkles,
  Sun,
  Wallet,
} from "lucide-react";

type Theme = "dark" | "light" | "system";

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [motion, setMotion] = useState(true);
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("apraxus-theme") as Theme) || "dark";
    const savedMotion = localStorage.getItem("apraxus-motion");
    const savedDensity =
      (localStorage.getItem("apraxus-density") as "comfortable" | "compact") ||
      "comfortable";
    const savedDev = localStorage.getItem("apraxus-dev-mode");

    setTheme(savedTheme);
    setDensity(savedDensity);
    setMotion(savedMotion !== "off");
    setDevMode(savedDev === "on");

    applyTheme(savedTheme);
  }, []);

  function applyTheme(value: Theme) {
    if (value === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.dataset.theme = value;
    }
  }

  function changeTheme(value: Theme) {
    setTheme(value);
    localStorage.setItem("apraxus-theme", value);
    applyTheme(value);
  }

  function changeMotion(value: boolean) {
    setMotion(value);
    localStorage.setItem("apraxus-motion", value ? "on" : "off");
    document.documentElement.dataset.motion = value ? "full" : "reduced";
  }

  function changeDensity(value: "comfortable" | "compact") {
    setDensity(value);
    localStorage.setItem("apraxus-density", value);
    document.documentElement.dataset.density = value;
  }

  function changeDev(value: boolean) {
    setDevMode(value);
    localStorage.setItem("apraxus-dev-mode", value ? "on" : "off");
  }

  function reset() {
    localStorage.removeItem("apraxus-theme");
    localStorage.removeItem("apraxus-motion");
    localStorage.removeItem("apraxus-density");
    localStorage.removeItem("apraxus-dev-mode");

    setTheme("dark");
    setMotion(true);
    setDensity("comfortable");
    setDevMode(false);

    document.documentElement.dataset.theme = "dark";
    document.documentElement.dataset.motion = "full";
    document.documentElement.dataset.density = "comfortable";
  }

  return (
    <main className="apx-settings-page">
      <section className="apx-settings-hero">
        <div>
          <span className="apx-eyebrow">APRAXUS / INTERFACE CONTROL</span>
          <h1>Settings</h1>
          <p>
            Configure the Apraxus interface without changing protocol state,
            wallet state, or network configuration.
          </p>
        </div>

        <div className="apx-settings-terminal">
          <div>
            <i />
            <i />
            <i />
          </div>
          <span>APX / UI-CONFIG</span>
          <strong>LOCAL PREFERENCES</strong>
        </div>
      </section>

      <div className="apx-settings-layout">
        <aside className="apx-settings-index">
          <span>CONFIGURATION</span>
          <a href="#appearance">01 / Appearance</a>
          <a href="#interface">02 / Interface</a>
          <a href="#network">03 / Network</a>
          <a href="#developer">04 / Developer</a>
          <a href="#system">05 / System</a>
        </aside>

        <div className="apx-settings-content">
          <SettingsSection
            id="appearance"
            number="01"
            icon={<Eye size={17} />}
            title="Appearance"
            description="Control how the protocol interface is rendered on this device."
          >
            <div className="apx-option-grid three">
              {[
                ["dark", "Dark", Moon],
                ["light", "Light", Sun],
                ["system", "System", Monitor],
              ].map(([value, label, Icon]: any) => (
                <button
                  key={value}
                  className={`apx-choice ${theme === value ? "selected" : ""}`}
                  onClick={() => changeTheme(value)}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                  {theme === value && <Check size={14} />}
                </button>
              ))}
            </div>
          </SettingsSection>

          <SettingsSection
            id="interface"
            number="02"
            icon={<Sparkles size={17} />}
            title="Interface"
            description="Tune motion and information density for your preferred workflow."
          >
            <SettingRow
              icon={<Activity size={16} />}
              title="Motion system"
              description="Scroll reveals, protocol transitions, and ambient interface animation."
            >
              <Toggle value={motion} onChange={changeMotion} />
            </SettingRow>

            <SettingRow
              icon={<Gauge size={16} />}
              title="Information density"
              description="Controls spacing around data-heavy protocol interfaces."
            >
              <div className="apx-segmented">
                <button
                  className={density === "comfortable" ? "active" : ""}
                  onClick={() => changeDensity("comfortable")}
                >
                  Comfortable
                </button>
                <button
                  className={density === "compact" ? "active" : ""}
                  onClick={() => changeDensity("compact")}
                >
                  Compact
                </button>
              </div>
            </SettingRow>
          </SettingsSection>

          <SettingsSection
            id="network"
            number="03"
            icon={<Network size={17} />}
            title="Network"
            description="Current network context used throughout the public protocol interface."
          >
            <div className="apx-network-detail">
              <div>
                <span>NETWORK</span>
                <strong>Arbitrum Sepolia</strong>
              </div>
              <div>
                <span>CHAIN ID</span>
                <strong>421614</strong>
              </div>
              <div>
                <span>ENVIRONMENT</span>
                <strong>TESTNET</strong>
              </div>
              <div>
                <span>STATUS</span>
                <strong className="online">
                  <i /> Operational
                </strong>
              </div>
            </div>

            <div className="apx-info-note">
              <Shield size={15} />
              <span>
                Network settings shown here describe the current public
                environment. They do not change the underlying protocol.
              </span>
            </div>
          </SettingsSection>

          <SettingsSection
            id="developer"
            number="04"
            icon={<Cpu size={17} />}
            title="Developer environment"
            description="Expose additional technical context while exploring the protocol."
          >
            <SettingRow
              icon={<Cpu size={16} />}
              title="Developer mode"
              description="Enables additional implementation and diagnostic information where supported."
            >
              <Toggle value={devMode} onChange={changeDev} />
            </SettingRow>

            <div className="apx-dev-state">
              <span>DEVELOPER MODE</span>
              <strong>{devMode ? "ENABLED" : "DISABLED"}</strong>
              <small>
                This preference is local to this browser and does not grant
                access to privileged protocol systems.
              </small>
            </div>
          </SettingsSection>

          <SettingsSection
            id="system"
            number="05"
            icon={<Wallet size={17} />}
            title="System"
            description="Local interface controls and product information."
          >
            <div className="apx-system-grid">
              <div>
                <span>CLIENT</span>
                <strong>APRAXUS WEB</strong>
              </div>
              <div>
                <span>PROTOCOL STATE</span>
                <strong>TESTNET</strong>
              </div>
              <div>
                <span>WALLET</span>
                <strong>USER CONTROLLED</strong>
              </div>
              <div>
                <span>DATA</span>
                <strong>LOCAL PREFERENCES</strong>
              </div>
            </div>

            <button className="apx-reset" onClick={reset}>
              <RotateCcw size={15} />
              Reset interface preferences
              <ChevronRight size={15} />
            </button>
          </SettingsSection>

          <div className="apx-settings-note">
            <CircleHelp size={16} />
            <p>
              These controls affect the presentation of the Apraxus website.
              They do not alter blockchain state, token balances, contracts,
              transactions, API credentials, or protocol governance.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function SettingsSection({
  id,
  number,
  icon,
  title,
  description,
  children,
}: {
  id: string;
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="apx-settings-section">
      <div className="apx-settings-section-head">
        <div className="apx-settings-number">{number}</div>
        <div className="apx-settings-icon">{icon}</div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="apx-settings-card">{children}</div>
    </section>
  );
}

function SettingRow({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="apx-setting-row">
      <div className="apx-setting-row-icon">{icon}</div>
      <div className="apx-setting-row-copy">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      className={`apx-toggle ${value ? "on" : ""}`}
      onClick={() => onChange(!value)}
      aria-label="Toggle setting"
    >
      <span />
    </button>
  );
}
