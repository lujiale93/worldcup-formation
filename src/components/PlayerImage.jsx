import { useState } from "react";
import { getPlayerImage } from "../data/flags";

export default function PlayerImage({ playerId, name, teamColor, size = 36, className = "" }) {
  const [error, setError] = useState(false);
  const url = getPlayerImage(playerId);
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("");

  const style = { width: size, height: size };

  if (!url || error) {
    return (
      <div className={`player-initials ${className}`} style={{
        ...style, background: teamColor, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontWeight: 700, fontSize: size * 0.3, flexShrink: 0,
      }}>
        {initials}
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={name}
      className={`player-photo ${className}`}
      style={{ ...style, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0 }}
      onError={() => setError(true)}
    />
  );
}
