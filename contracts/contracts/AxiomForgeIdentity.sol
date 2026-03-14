// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title AxiomForge Identity & Receipt Registry (MVP)
/// @notice Minimal placeholder for ERC‑8004 identity + receipts
contract AxiomForgeIdentity {
    event IdentityRegistered(address indexed agent, string metadataURI);
    event ReceiptSubmitted(address indexed agent, bytes32 receiptHash, string artifactURI);

    mapping(address => string) public metadataURIs;

    function registerIdentity(string calldata metadataURI) external {
        metadataURIs[msg.sender] = metadataURI;
        emit IdentityRegistered(msg.sender, metadataURI);
    }

    function submitReceipt(bytes32 receiptHash, string calldata artifactURI) external {
        require(bytes(metadataURIs[msg.sender]).length > 0, "identity not registered");
        emit ReceiptSubmitted(msg.sender, receiptHash, artifactURI);
    }
}
